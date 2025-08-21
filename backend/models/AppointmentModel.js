import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentCode: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    additionalInfo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

appointmentSchema.pre("validate", async function (next) {
  if (this.isNew && !this.appointmentCode) {
    const currentYear = new Date().getFullYear();

    const count = await mongoose.model("Appointment").countDocuments({
      appointmentCode: { $regex: `^APT-${currentYear}` },
    });

    this.appointmentCode = `APT-${currentYear}${String(count + 1).padStart(
      3,
      "0"
    )}`;
  }
  next();
});


const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
