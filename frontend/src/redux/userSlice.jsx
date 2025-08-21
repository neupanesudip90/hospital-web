import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";
import { getErrorPayload } from "../utils/errorPayload";

// Get all doctors
export const getAllDoctors = createAsyncThunk(
  "users/getAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const role = "doctor";
      const { data } = await API.get(`/all/${role}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  }
);

// Get all admins
export const getAllAdmins = createAsyncThunk(
  "users/getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin");
      return data;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  }
);

// Get any user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/profile/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  }
);

// Get logged-in user details (no ID needed — token decides who)
export const getAuthUser = createAsyncThunk(
  "users/getAuthUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth"); // No ID in URL
      return data;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  }
);

// Update doctor
export const updateDoctor = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await API.put(`/doctor/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  }
);


// Delete any user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  }
);

// ===== Initial State =====
const initialState = {
  doctors: [],
  admins: [],
  loading: false,
  error: null,
  selectedUser: null,
  authUser: null,
};

// ===== Slice =====
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    clearAuthUser(state) {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    // ===== getAllDoctors =====
    builder
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== getAllAdmins =====
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== getUserById =====
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== updateUser =====
    builder
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const indexDoc = state.doctors.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (indexDoc !== -1) state.doctors[indexDoc] = action.payload;

        const indexAdmin = state.admins.findIndex(
          (admin) => admin.id === action.payload.id
        );
        if (indexAdmin !== -1) state.admins[indexAdmin] = action.payload;

        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== deleteUser =====
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(
          (doc) => doc.id !== action.payload
        );
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload
        );

        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload; // <- important
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedUser, clearAuthUser } = userSlice.actions;
export default userSlice.reducer;
