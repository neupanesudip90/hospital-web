// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ===== LOGIN =====
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/login", userData);

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.user._id);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ===== REGISTER PATIENT =====
export const registerPatient = createAsyncThunk(
  "auth/registerPatient",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/patient/register", userData);

      // Optionally store token if you want auto-login
      // localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      const errResponse = error.response?.data || {};
      return rejectWithValue({
        message: errResponse.message || "Registration failed",
        errors: errResponse.errors || [],
      });
    }
  }
);

// ===== REGISTER DOCTOR =====
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/doctor/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

// ===== REGISTER ADMIN =====
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      const errResponse = error.response?.data;
      return rejectWithValue({
        message: errResponse?.message || "Registration failed",
        errors: errResponse?.errors || [],
        status: error.response?.status || 500,
      });
    }
  }
);

// ===== INITIAL STATE =====
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// ===== SLICE =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== REGISTER PATIENT =====
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Registration failed",
          errors: [],
        };
      })

      // ===== REGISTER DOCTOR =====
      .addCase(registerDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerDoctor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Registration failed",
          errors: [],
        };
      })

      // ===== REGISTER ADMIN =====
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Registration failed",
          errors: [],
        };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
