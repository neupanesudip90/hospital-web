import React from "react";
import poster from "../../assets/doctor-photo.jpeg";
import mobilePoster from "../../assets/doctor-photo-mobile.jpeg";
import { SlCalender } from "react-icons/sl";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import doctor from "../../assets/doctor-group.avif";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import doctorbg from "../../assets/doctor.jpg";
import Slider from "../slider";
import News from "../News";
import Contact from "../Contact";
import OurService from "../ourService";

function Herosection() {
  return (
    <>
      <div
        className="w-full lg:h-[80vh] h-[50vh] bg-cover bg-center bg-no-repeat lg:p-15 relative "
        style={{
          backgroundImage: `url(${
            window.innerWidth < 768 ? mobilePoster : poster
          })`,
        }}
      >
        <div className="container mx-auto flex flex-col justify-center items-start h-full p-5 lg:gap-3 gap-1">
          <p className="text-white lg:text-2xl text-lg  font-bold">
            CARING FOR LIFE
          </p>
          <p className="text-blue-950 lg:text-5xl text-xl font-bold ">
            Leading the Way
          </p>
          <p className="text-blue-950 lg:text-5xl text-xl font-bold ">
            in Medical Excellence
          </p>
          <button className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Our services
          </button>
        </div>
      </div>
      <div className="hidden lg:block ">
        <div className="container mx-auto flex justify-between items-center gap-10 relative bottom-8 left-0 right-0">
          <div className=" p-8  bg-blue-800 rounded-lg shadow-lg flex justify-between items-center gap-5">
            <p className="text-center text-md text-white font-semibold ">
              BOOK AN APPOINTMENT
            </p>
            <SlCalender className="text-white mx-auto text-3xl font-semibold" />
          </div>
          <div className=" p-8  bg-[#bfd3f9] rounded-lg shadow-lg flex justify-between items-center gap-5 ">
            <p className="text-center text-md text-blue-900 font-semibold ">
              TALK TO OUR STAFF
            </p>
            <MdOutlinePhoneInTalk className="text-blue-900 mx-auto text-3xl font-semibold" />
          </div>
          <div className=" p-8  bg-blue-500 rounded-lg shadow-lg flex justify-between items-center gap-5 ">
            <p className="text-center text-md text-white font-semibold ">
              TALK TO OUR STAFF
            </p>
            <MdOutlinePhoneInTalk className="text-white mx-auto text-3xl font-semibold" />
          </div>

          <div className=" p-8  bg-gray-800 rounded-lg shadow-lg flex justify-between items-center gap-5">
            <p className="text-center text-md text-white font-semibold ">
              INQUIRY WITH US
            </p>
            <TbMessages className="text-white mx-auto text-3xl font-semibold" />
          </div>
        </div>
      </div>
      {/* welcome section */}
      <div className="container mx-auto  text-center mb-10 ">
        <p className="text-blue-500 font-bold text-md md:text-lg mt-10 ">
          WELCOME TO{" "}
          <span className="text-orange-400">LIFELINE MEDICARE CENTER</span>
        </p>
        <p className="text-blue-950 font-bold text-2xl md:text-3xl  mt-2">
          A GREAT PLACE TO RECEIVE MEDICAL CARE
        </p>
        <p className="text-gray-700 text-md md:text-lg mt-3">
          Our team is dedicated to providing the best care possible. Your health
          is our priority and we are here to help you every step of the way. We
          have the best doctors and medical staff ready to assist you. We are
          ready to serve you 24/7.
        </p>
        <p className="text-blue-500 font-bold text-lg mt-3">
          Link to more information <FaArrowRightLong className="inline ml-2" />
        </p>
        <img
          src={doctor}
          alt="Doctor Group"
          className=" mx-auto mt-5 h-[300px] w-200 object-cover"
        />
      </div>
      {/* our service section */}
      <div>
        <OurService />
      </div>
      {/* our facility section */}
      <div className="container mb-5 ">
        <p className="text-blue-500 text-2xl mt-3 font-bold text-center">
          Always Caring
        </p>
        <p className="text-blue-950 font-bold text-4xl mt-2 text-center">
          Our Specialties
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 lg:gap-8 mt-5 text-center float-center">
          <div className="p-5 border-2 border-blue-500 rounded-lg ">
            <MedicalServicesIcon className="text-blue-500 !w-10 !h-10 mb-2" />
            <p className="text-gray-700 font-semibold text-lg">
              General Medicine
            </p>
          </div>
          <div className="p-5 border-2 border-blue-500 rounded-lg ">
            <MedicalServicesIcon className="text-blue-500 !w-10 !h-10 mb-2" />
            <p className="text-gray-700 font-semibold text-lg">Surgery</p>
          </div>
          <div className="p-5 border-2 border-blue-500 rounded-lg ">
            <MedicalServicesIcon className="text-blue-500 !w-10 !h-10 mb-2" />
            <p className="text-gray-700 font-semibold text-lg">Cardiology</p>
          </div>
          <div className="p-5 border-2 border-blue-500 rounded-lg ">
            <MedicalServicesIcon className="text-blue-500 !w-10 !h-10 mb-2" />
            <p className="text-gray-700 font-semibold text-lg">Blood Bank</p>
          </div>

          <div className="p-5 border-2 border-blue-500 rounded-lg ">
            <MedicalServicesIcon className="text-blue-500 !w-10 !h-10 mb-2" />
            <p className="text-gray-700 font-semibold text-lg">
              General Medicine
            </p>
          </div>
          <div className="p-5 border-2 border-blue-500 rounded-lg ">
            <MedicalServicesIcon className="text-blue-500 !w-10 !h-10 mb-2" />
            <p className="text-gray-700 font-semibold text-lg">Surgery</p>
          </div>
        </div>
      </div>

      {/* book appointment section */}
      <div
        className="mt-10 w-full lg:h-[550px] bg-cover bg-center relative py-5"
        style={{ backgroundImage: `url(${doctorbg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/50"></div>

        {/* Content */}
        <div className="relative container mx-auto lg:flex flex-cols justify-between gap-10 items-center h-full ">
          <div className="text-lg font-semibold lg:w-1/2 w-full text-gray-700 ">
            <p className="text-blue-600 font-bold text-3xl mb-5">
              BOOK APPOINTMENT
            </p>
            <p>
              Schedule your appointment today! We are here to help you. We
              provide best medical services in an affordable and convenient way.
              Our medical team is dedicated to ensuring your health and
              well-being.
            </p>
          </div>
          <div className="lg:w-1/2 w-full p-5 rounded-lg shadow-lg mt-5  bg-blue-800 text-white">
            <form action="">
              <div className="grid grid-cols-2 float-center gap-3 text-white placeholder-white">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-2 border border-gray-300 rounded-lg w-full placeholder-white"
                />
                <input
                  type="email"
                  className="p-2 border border-gray-300 rounded-lg w-full text-white  placeholder-white"
                  placeholder="Enter your email"
                />
                <select className="p-2 border border-gray-300 rounded-lg w-full bg-blue-800">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="p-2 border border-gray-300 rounded-lg w-full placeholder-white"
                />
                <select className="p-2 border border-gray-300 rounded-lg w-full  bg-blue-800">
                  <option value="">Select Service</option>
                  <option value="general-checkup">General Checkup</option>
                  <option value="blood-test">Blood Test</option>
                  <option value="x-ray">X-Ray</option>
                  <option value="ultrasound">Ultrasound</option>
                  <option value="specialist-consultation">
                    Specialist Consultation
                  </option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg w-full  bg-blue-800">
                  <option value="">Select Department</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="general">General Medicine</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg w-full  bg-blue-800">
                  <option value="">Select Doctor</option>
                  <option value="dr-smith">Dr. Smith</option>
                  <option value="dr-jones">Dr. Jones</option>
                  <option value="dr-brown">Dr. Brown</option>
                  <option value="dr-williams">Dr. Williams</option>
                </select>
                <input
                  type="date"
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                <input
                  type="time"
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col mt-5 justify-center items-center">
                <textarea
                  placeholder="Additional information (optional)"
                  className="p-2 border border-gray-300 rounded-lg w-full h-24 placeholder-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition duration-300"
              >
                Submit Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* our doctors section */}
      <div className="container mt-20 ">
        <p className="text-blue-500 text-2xl mt-3 font-bold text-center">
          TRUSTED CARE
        </p>
        <p className="text-blue-950 font-bold text-4xl mt-2 text-center">
          Our Doctors
        </p>
        <div className="mt-10">
          <Slider />
        </div>
      </div>
      {/* news section */}
      <div className="container ">
        <News />
      </div>
      <div>
        <Contact />
      </div>
     
    </>
  );
}

export default Herosection;
