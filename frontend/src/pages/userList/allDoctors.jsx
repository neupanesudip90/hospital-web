import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import Sidepanel from "../../components/sidepanel";
import BackButton from "../../components/backButton";

function AllDoctors() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.user.doctors);

  React.useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen flex lg:flex-row flex-col bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full  shadow-md mb-15">
        <Sidepanel />
      </div>
      {/* //seen back button only on sm device */}
      <div className="block lg:hidden ml-5 mt-3">
        <BackButton />
      </div>

      {/* Main Section */}
      <div className="lg:w-4/5 w-full mt-5 lg:p-6">
        <div className="container mx-auto ">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">All Doctors</h2>
        </div>

        <div className="container mx-auto flex flex-wrap md:justify-between gap-10 lg:justify-start  justify-center items-center  ">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div
                key={index}
                className="flex-col justify-center items-center "
              >
                <img
                  src={doctor.profilePicture}
                  alt={doctor.name}
                  className="h-60 md:w-80 lg:w-70 w-88 rounded-t-md "
                />
                <div className="flex flex-col items-center text-center bg-blue-300 p-8 md:w-80 lg:w-70">
                  <p className="font-semibold text-xl text-blue-600">
                    {doctor?.name ? doctor.name.toUpperCase() : "N/A"}
                  </p>
                  <p className="text-blue-950 text-xl font-bold mt-1">
                    {doctor?.department
                      ? doctor.department.toUpperCase()
                      : "N/A"}
                  </p>
                  <div className="flex justify-center items-center space-x-4 mt-4 text-xl">
                    <FaFacebook className="text-blue-600" />
                    <FaInstagram className="text-pink-600" />
                    <FaLinkedin className="text-blue-700" />
                  </div>
                </div>
                <Link
                  to={`/profile/${doctor._id}`}
                  className="flex justify-center items-center bg-blue-900 text-white p-3 cursor-pointer rounded-b-md md:w-80 lg:w-70 "
                >
                  View Profile
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllDoctors;
