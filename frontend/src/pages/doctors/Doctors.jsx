import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import doctorPhoto from "../../assets/doctor.jpg"
import BreadCrumb from "../../components/BreadCrumb";
import doctor1 from "../../assets/doctor1.jpeg";
import doctor2 from "../../assets/doctor2.jpg";
import doctor3 from "../../assets/doctor3.jpeg";
import doctor4 from "../../assets/doctor4.jpg";
import doctor5 from "../../assets/doctor5.jpeg";
import doctor6 from "../../assets/doctor6.jpeg";
import doctor7 from "../../assets/doctor7.avif";
import doctor8 from "../../assets/doctor8.jpeg";

import News from "../../components/News";
import Contact from "../../components/Contact";

const doctorList = [
  {
    name: "Doctor 1",
    image: doctor1,
    department: "Cardiology",
  },
  {
    name: "Doctor 2",
    image: doctor2,
    department: "Neurology",
  },
  { name: "Doctor 3", image: doctor3, department: "Pediatrics" },
  { name: "Doctor 4", image: doctor4, department: "Orthopedics" },
  { name: "Doctor 5", image: doctor5, department: "Dermatology" },
  { name: "Doctor 6", image: doctor6, department: "Gynecology" },
  { name: "Doctor 7", image: doctor7, department: "Oncology" },
  { name: "Doctor 8", image: doctor8, department: "General Medicine" },
];


function Doctors() {
  return (
    <div>
      <div
        className="w-full  bg-cover bg-center relative py-5 h-70"
        style={{ backgroundImage: `url(${doctorPhoto})` }}
      >
        {/* Overlay */}
        <div className=" absolute inset-0 bg-white/50"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-start justify-center h-full text-center">
          <BreadCrumb />
          <p className="text-5xl font-bold text-blue-950">Our Doctors</p>
        </div>
      </div>
      <div className="mt-20 ">
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-2 lg:gap-15">
          {doctorList.map((doctor, index) => (
            <div key={index} className="flex-col justify-center items-center  ">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-70 w-90 rounded-t-md"
              />
              <div className="flex flex-col items-center text-center bg-blue-300 p-8 w-90">
                <p className="font-semibold text-xl text-blue-600">
                  {doctor.name.toUpperCase()}
                </p>
                <p className="text-blue-950 text-xl font-bold mt-1">
                  {doctor.department.toUpperCase()}
                </p>
                <div className="flex justify-center items-center space-x-4 mt-4 text-xl">
                  <FaFacebook className="text-blue-600" />
                  <FaInstagram className="text-pink-600" />
                  <FaLinkedin className="text-blue-700" />
                </div>
              </div>
              <button className="flex justify-center items-center bg-blue-900 text-white p-3 cursor-pointer rounded-b-md w-90 ">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-15 ">
        <News />
      </div>
      <div className="mt-10">
        <Contact />
      </div>
    </div>
  );
}

export default Doctors
