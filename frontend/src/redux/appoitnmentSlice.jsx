import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await API.post("/appointments/book", appointmentData);
      return response.data; // your success payload
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async (appointmentData) => {
    const response = await API.put("/appointments/update", appointmentData);
    return response.data;
  }
);

export const getAllAppointments = createAsyncThunk(
  "appointments/getAll",
  async () => {
    const response = await API.get("/appointments");
    return response.data;
  }
);

export const getAppointmentById = createAsyncThunk(
  "appointments/getById",
  async (id) => {
    const response = await API.get(`/appointments/${id}`);
    return response.data;
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id) => {
    const response = await API.delete(`/appointments/${id}`);
    return response.data;
  }
);

// get all doctors by their department
export const doctorByDepartment = createAsyncThunk(
  "appointments/doctorByDepartment",
  async (department, { rejectWithValue }) => {
    try {
      const response = await API.get(`/doctor/department/${department}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch doctors" }
      );
    }
  }
);

//search appointment by name or email
export const searchAppointment = createAsyncThunk(
  "appointments/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await API.get(`/appointments/search?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to search appointments" }
      );
    }
  }
);

//filter appointment by status
export const filterAppointment = createAsyncThunk(
  "appointments/filter",
  async (status, { rejectWithValue }) => {
    try {
      const response = await API.get(`/appointments/filter?status=${status}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to filter appointments" }
      );
    }
  }
);

// Get latest 10 confirmed appointments
export const getLatestConfirmedAppointments = createAsyncThunk(
  "appointments/getLatestConfirmed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/appointments/latest-confirmed");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch latest confirmed appointments" });
    }
  }
);



const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    selectedAppointment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload.appointment; // full updated appointment
        const index = state.appointments.findIndex(
          (appointment) => appointment._id === updated._id
        );

        if (index !== -1) {
          // Merge existing appointment with updated fields
          state.appointments[index] = {
            ...state.appointments[index],
            ...updated,
          };
        }
      })

      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAppointment = action.payload; // store the single appointment here
      })
      .addCase(getAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch appointment";
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload.id
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(doctorByDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorByDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(doctorByDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    
      //for search appointment
      .addCase(searchAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(searchAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

    // for filter appointment
.addCase(filterAppointment.pending, (state) => {
  state.loading = true;
})
.addCase(filterAppointment.fulfilled, (state, action) => {
  state.loading = false;
  state.appointments = action.payload; 
})
.addCase(filterAppointment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
    
.addCase(getLatestConfirmedAppointments.pending, (state) => {
  state.loading = true;
})
.addCase(getLatestConfirmedAppointments.fulfilled, (state, action) => {
  state.loading = false;
  state.latest = action.payload; // use "latest" instead
})

.addCase(getLatestConfirmedAppointments.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})



  },
});

export default appointmentSlice.reducer;
