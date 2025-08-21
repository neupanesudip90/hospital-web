import React, { useEffect } from "react";
import Charts from "../../components/charts";
import { SlCalender } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa";
import Sidepanel from "../../components/sidepanel";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getLatestConfirmedAppointments } from "../../redux/appoitnmentSlice";
import profile from "../../assets/doctor3.jpeg";

// Reusable Card Component
const CardList = ({ title, subtitle, icon, data }) => (
  <div className="flex flex-col bg-white rounded-lg shadow border border-gray-300">
    <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300">
      <div className="flex items-center gap-2 text-gray-700 font-semibold">
        {icon}
        <p>{title}</p>
      </div>
      <p className="text-gray-500">{subtitle}</p>
    </div>
    <div className="flex flex-col">
      {data && data.length > 0 ? (
        data.map((patient, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={patient.image || profile} // fallback image
                alt={patient.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">{patient.name}</p>
                <p className="text-sm text-gray-500">
                  Booking on <span className="font-medium">{patient.date}</span>
                </p>
              </div>
            </div>
            <FaArrowRight className="text-gray-400 hover:text-gray-600 transition" />
          </div>
        ))
      ) : (
        <p className="text-gray-500 px-5 py-3">No appointments found.</p>
      )}
    </div>
  </div>
);

function Dashboard() {
  const dispatch = useDispatch();

  // Fetch latest appointments
  const latestAppointments = useSelector(
    (state) => state.appointments.latest || []
  );

  // Split the latest appointments into 2 arrays (5 each)
  const firstFive = latestAppointments.slice(0, 5);
  const nextFive = latestAppointments.slice(5, 10);

  useEffect(() => {
    dispatch(getLatestConfirmedAppointments());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex lg:flex-row flex-col">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full shadow-md mb-15">
        <Sidepanel />
      </div>

      {/* Main Content */}
      <div className="lg:w-4/5 w-full p-6 space-y-8">
        {/* Charts Section */}
        <Charts />

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardList
            title="Latest Appointments (1-5)"
            subtitle={`${firstFive.length} Patients`}
            icon={<SlCalender />}
            data={firstFive}
          />
          <CardList
            title="Latest Appointments (6-10)"
            subtitle={`${nextFive.length} Patients`}
            icon={<SlCalender />}
            data={nextFive}
          />
          <CardList
            title="Patients Review"
            subtitle="20 Patients"
            icon={<SlCalender />}
            data={[]} // keep empty or replace with actual review data
          />
        </div>
      </div>
    </div>
  );
}

CardList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default Dashboard;
