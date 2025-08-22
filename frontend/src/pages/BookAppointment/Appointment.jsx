import React, { useState, useEffect } from "react";
import doctorPhoto from "../../assets/doctor.jpg";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  doctorByDepartment,
} from "../../redux/appoitnmentSlice";

function Appointment() {
  const dispatch = useDispatch();
  const { loading, error, doctor } = useSelector((state) => state.appointments);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    service: "",
    dob: "",
    department: "",
    doctor: "",
    date: "",
    additionalInfo: "",
  });

  // Fetch doctors when department changes
  useEffect(() => {
    if (formData.department) {
      dispatch(doctorByDepartment(formData.department));
    }
  }, [dispatch, formData.department]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(bookAppointment(formData));

      // Check if fulfilled
      if (bookAppointment.fulfilled.match(resultAction)) {
        alert("Appointment booked successfully!");
      } else {
        // If rejected, show error
        console.error(
          "Booking failed:",
          resultAction.payload || resultAction.error
        );
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="w-full bg-cover bg-center relative py-5 h-[70vh]"
        style={{ backgroundImage: `url(${doctorPhoto})` }}
      >
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-start justify-center h-full text-center">
          <BreadCrumb />
          <p className="text-5xl font-bold text-blue-950">Book Appointment</p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 mt-10">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold text-blue-950">BOOK APPOINTMENT</p>
            <p className="text-md font-semibold text-gray-600">
              Please fill in the details below to book your appointment. We are
              here to help you. We value your time and are committed to
              providing you with the best service possible. We appreciate your
              trust in us and look forward to serving you.
            </p>
          </div>

          <div className="w-full p-5 rounded-lg shadow-lg mt-5 bg-blue-800 text-white">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3  bg-blue-800">
                {/* Name */}
                <div>
                  <label className="font-semibold text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="p-2 border rounded-lg w-full bg-blue-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-semibold text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="font-semibold text-gray-300">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="font-semibold text-gray-300">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* dob */}
                <div>
                  <label className="font-semibold text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob ? formData.dob.slice(0, 10) : ""}
                    placeholder="Enter your date of birth"
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="font-semibold text-gray-300">Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Service</option>
                    <option value="general-checkup">General Checkup</option>
                    <option value="blood-test">Blood Test</option>
                    <option value="x-ray">X-Ray</option>
                    <option value="ultrasound">Ultrasound</option>
                    <option value="specialist-consultation">
                      Specialist Consultation
                    </option>
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="font-semibold text-gray-300">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="general">General Medicine</option>
                  </select>
                </div>

                {/* Doctor */}
                <div>
                  <label className="font-semibold text-gray-300">Doctor</label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={!formData.department}
                  >
                    <option value="">Select Doctor</option>
                    {Array.isArray(doctor) &&
                      doctor.map((doc) => (
                        <option key={doc._id} value={doc.name}>
                          {doc?.name || "Unnamed Doctor"}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="font-semibold text-gray-300">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date ? formData.date.slice(0, 10) : ""}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
              {/* Additional Info */}
              <div>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Additional information (optional)"
                  className="p-2 border rounded-lg w-full h-24 bg-blue-800 text-white placeholder-gray-300 mt-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`mt-5 px-6 py-2 rounded-lg w-full transition duration-300 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={loading}
              >
                {loading ? "Booking..." : "Submit Appointment"}
              </button>
            </form>

            {error && <p className="text-red-400 mt-3">{error}</p>}
          </div>
        </div>

        {/* Right Side - Schedule */}
        <div className="w-full md:w-1/2">
          <div className=" mt-10 bg-blue-900 rounded-lg py-14 px-5">
            <h1 className="text-5xl font-bold text-gray-300">Schedule</h1>
            <table className="w-full text-left mt-4 border-collapse">
              <thead>
                <tr className="bg-blue-800 text-gray-200">
                  <th className="px-4 py-2">Day</th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monday", "9:00 AM - 5:00 PM"],
                  ["Tuesday", "9:00 AM - 5:00 PM"],
                  ["Wednesday", "9:00 AM - 5:00 PM"],
                  ["Thursday", "9:00 AM - 5:00 PM"],
                  ["Friday", "9:00 AM - 5:00 PM"],
                  ["Saturday", "Only Emergency 24/7"],
                  ["Sunday", "Only Emergency 24/7"],
                ].map(([day, time]) => (
                  <tr
                    key={day}
                    className="border-b border-gray-600 hover:bg-blue-800 text-gray-200"
                  >
                    <td className="px-4 py-2">{day}</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <p className="text-gray-300 mt-5 text-center">
                Note: Schedule may vary based on doctors availability.
              </p>
              <p className="text-3xl text-center font-bold text-gray-100 mt-5 p-2">
                EMERGENCY - 123455677
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
