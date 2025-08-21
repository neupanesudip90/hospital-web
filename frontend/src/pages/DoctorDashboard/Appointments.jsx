import React, { useEffect, useState } from "react";
import Sidepanel from "../../components/sidepanel";
import { FaEye } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import profile from "../../assets/doctor3.jpeg";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  updateAppointment,
  searchAppointment,
  filterAppointment,
} from "../../redux/appoitnmentSlice";
import { Link } from "react-router-dom";
import BackButton from "../../components/backButton";

function Appointments() {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const role = localStorage.getItem("role");

  // Local state for search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch all appointments initially
  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  // Debounced search + filter combined
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm && statusFilter) {
        // Apply both search and filter together
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

  const headerList = [
    "#",
    "Code",
    "Name",
    "Date of Birth",
    "Gender",
    "Department",
    "Date",
    "Doctor",
    "Status",
    ...(role === "doctor" ? ["Actions"] : []),
  ];

  const handleStatusChange = (appointmentCode, newStatus) => {
    dispatch(updateAppointment({ appointmentCode, status: newStatus }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="lg:w-1/5 w-full shadow-md mb-15">
        <Sidepanel />
      </div>

      <div className="block lg:hidden ml-5 mt-3">
        <BackButton />
      </div>

      <div className="lg:w-4/5 w-full mt-5">
        <div className="container mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>

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
              {/* Search Button */}
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
              {/* Filter Button */}
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

          {/* Show applied filters */}
          <div className="text-sm text-gray-600">
            {searchTerm && <span>Search: &quot;{searchTerm}&quot; </span>}
            {statusFilter && <span> | Status: &quot;{statusFilter}&quot;</span>}
            {` | Showing ${appointments.length} appointment${
              appointments.length === 1 ? "" : "s"
            }`}
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  {headerList.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap border-b border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className={`text-sm text-gray-700 font-medium gap-3 border-b border-gray-300 ${
                        appointment.status === "confirmed"
                          ? "bg-green-100"
                          : appointment.status === "rejected"
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <td className="px-6 py-3 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {appointment?.appointmentCode}
                      </td>
                      <td className="px-8 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-5">
                          <img
                            src={profile}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                          />
                          <span>{appointment?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {appointment?.dob}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {appointment?.gender}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {appointment?.department}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {appointment?.date}
                      </td>
                      <td className="px-8 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-5">
                          <img
                            src={profile}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                          />
                          <span>{appointment?.doctor || "Dr. Smith"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span
                          className={`font-semibold px-2 rounded ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-700 rounded-xl text-sm"
                              : appointment.status === "rejected"
                              ? "bg-red-100 text-red-700 rounded-xl text-sm"
                              : "bg-gray-100 text-gray-600 rounded-xl text-sm"
                          }`}
                        >
                          {appointment.status || "pending"}
                        </span>
                      </td>

                      {role === "doctor" && (
                        <td className="px-6 py-3 whitespace-nowrap flex space-x-3">
                          <Tooltip title="View Details" arrow>
                            <Link
                              to={`/patient/${appointment._id}`}
                              className="text-blue-500 bg-blue-200 hover:bg-blue-700 text-md p-2 rounded-full"
                            >
                              <FaEye />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Confirm Appointment" arrow>
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  appointment.appointmentCode,
                                  "confirmed"
                                )
                              }
                              className="text-green-500 bg-green-200 hover:bg-green-700 text-md p-2 rounded-full"
                            >
                              <TiTick />
                            </button>
                          </Tooltip>
                          <Tooltip title="Reject Appointment" arrow>
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  appointment.appointmentCode,
                                  "rejected"
                                )
                              }
                              className="text-red-500 bg-red-200 hover:bg-red-700 text-md p-2 rounded-full"
                            >
                              <ImCross />
                            </button>
                          </Tooltip>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={headerList.length}
                      className="text-center py-4 text-gray-500"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
