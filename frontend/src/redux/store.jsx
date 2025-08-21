//store of redux
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import authReducer from "./authSlice";
import appointmentReducer from "./appoitnmentSlice";
import userReducer from "./userSlice"
const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
    appointments: appointmentReducer,
    user: userReducer,
  },
});

export default store;
