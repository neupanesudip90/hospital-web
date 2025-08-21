import React, { useEffect, useState } from "react";
import Sidepanel from "../../components/sidepanel";
import profile from "../../assets/doctor3.jpeg";
import { PiDotsThreeBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  searchAppointment,
  filterAppointment,
} from "../../redux/appoitnmentSlice";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BackButton from "../../components/backButton";

// Dropdown menu
const OptionCard = ({ appointment }) => (
  <div className="bg-white w-40 flex flex-col border border-gray-300 shadow-lg rounded-lg absolute top-16 right-3 z-50">
    <Link
      to={`/patient/${appointment._id}`}
      className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 hover:text-blue-500 font-semibold"
    >
      <FaRegUserCircle /> Profile
    </Link>
    <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 hover:text-red-500 font-semibold">
      <MdDeleteForever className="text-red-500 text-sm" /> Delete Patient
    </div>
  </div>
);

function Patients() {
  const [menuIndex, setMenuIndex] = useState(null);

  // Toggle dropdown
  const toggleOptions = (e, id) => {
    e.stopPropagation();
    setMenuIndex(menuIndex === id ? null : id);
  };

  // Close when clicking outside
  useEffect(() => {
    const closeMenu = () => setMenuIndex(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch all appointments initially
  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  // Debounced search + filter
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm && statusFilter) {
        dispatch(searchAppointment(searchTerm)).then(() => {
          dispatch(filterAppointment(statusFilter));
        });
      } else if (searchTerm) {
        dispatch(searchAppointment(searchTerm));
      } else if (statusFilter) {
        dispatch(filterAppointment(statusFilter));
      } else {
        dispatch(getAllAppointments());
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm, statusFilter, dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full shadow-md mb-15">
        <Sidepanel />
      </div>

      <div className="block lg:hidden ml-5 mt-3">
        <BackButton />
      </div>

      {/* Main Section */}
      <div className="lg:w-4/5 w-full mt-5">
        <div className="container mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Patients Lists</h2>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-2">
            <div className="flex space-x-2 w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => dispatch(searchAppointment(searchTerm))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>

            <div className="flex space-x-2">
              <select
                className="border border-gray-300 rounded-lg px-4 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() =>
                  statusFilter
                    ? dispatch(filterAppointment(statusFilter))
                    : dispatch(getAllAppointments())
                }
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Apply Filter
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-start mb-5">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex-col items-center justify-center border border-gray-300 bg-white shadow rounded-lg p-8 relative"
                >
                  <div className="flex items-center justify-between gap-5 relative">
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                    />
                    <button
                      className="mt-2 w-8 h-8 bg-blue-200 shadow-3xl rounded-full text-blue-500 hover:bg-blue-800 hover:text-white transition duration-300"
                      onClick={(e) => toggleOptions(e, appointment._id)}
                    >
                      <PiDotsThreeBold className="text-3xl" />
                    </button>

                    {menuIndex === appointment._id && (
                      <OptionCard appointment={appointment} />
                    )}
                  </div>

                  <div className="mt-4 text-md font-semibold">
                    <p className="text-lg font-semibold text-gray-800">
                      {appointment?.name.toUpperCase()}
                    </p>
                    <p>
                      <span className="text-sm text-blue-500">
                        ({appointment?.appointmentCode})
                      </span>
                    </p>

                    <p className="text-md text-gray-700">
                      Status:{" "}
                      <span
                        className={`font-semibold px-2 rounded ${
                          appointment?.status === "confirmed"
                            ? "bg-green-100 text-green-700 rounded-md text-sm"
                            : appointment?.status === "rejected"
                            ? "bg-red-100 text-red-700 rounded-md text-sm"
                            : "bg-gray-100 text-gray-600 rounded-md text-sm"
                        }`}
                      >
                        {appointment?.status}
                      </span>
                    </p>

                    <p className="text-md text-gray-500">
                      {appointment?.gender}
                    </p>
                    <p className="text-md text-gray-500">
                      {appointment?.department}
                    </p>
                    <p className="text-md text-gray-500">
                      Date: {appointment?.date?.slice(0, 10)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No patients found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

OptionCard.propTypes = {
  appointment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    appointmentCode: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default Patients;
