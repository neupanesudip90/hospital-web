import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import nurse from "../assets/nurses.jpg";
import nurses from "../assets/nurse.webp";
import HealingIcon from "@mui/icons-material/Healing";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

function OurService() {
  return (
    <div className="container mx-auto  mb-16">
      {/* Section title */}
      <div className="text-center">
        <p className="text-blue-500 text-lg mt-13 font-bold">
          CARE YOU CAN BELIEVE IN OUR
        </p>
        <p className="text-blue-950 font-bold text-3xl mt-2">SERVICES</p>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/5 border border-gray-300 lg:border-2 lg:border-blue-500 shadow-lg rounded-md">
          <ul className="flex flex-wrap lg:flex-col">
            <li className="w-1/2 lg:w-full">
              <div className="flex flex-col items-center gap-2 py-3">
                <HealingIcon className="text-blue-500 !w-10 !h-10" />
                <span className="text-gray-600 font-semibold text-lg">
                  Free Checkup
                </span>
              </div>
            </li>
            <li className="w-1/2 lg:w-full bg-blue-900">
              <div className="flex flex-col items-center gap-2 py-3">
                <FaHeartbeat className="text-gray-100 !w-10 !h-10" />
                <span className="text-gray-100 font-semibold text-lg">
                  Cardiogram
                </span>
              </div>
            </li>
            <li className="w-1/2 lg:w-full">
              <div className="flex flex-col items-center gap-2 py-3">
                <MedicalServicesIcon className="text-blue-500 !w-10 !h-10" />
                <span className="text-gray-600 font-semibold text-lg">
                  DNA Testing
                </span>
              </div>
            </li>
            <li className="w-1/2 lg:w-full">
              <div className="flex flex-col items-center gap-2 py-3">
                <MdBloodtype className="text-blue-500 !w-10 !h-10" />
                <span className="text-gray-600 font-semibold text-lg">
                  Blood Bank
                </span>
              </div>
            </li>
            <li className="w-full bg-blue-800 text-white">
              <div className="flex flex-col items-center gap-2 py-5">
                View all
              </div>
            </li>
          </ul>
        </div>

        {/* Middle Content */}
        <div className="w-full lg:w-2/5 flex flex-col gap-5">
          <p className="text-2xl md:text-2xl text-gray-700 font-bold text-center">
            A passion for putting patients first
          </p>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-5 text-lg text-gray-700 font-semibold">
              <div>
                <GoDotFill className="text-blue-500 inline-block" /> Passion for
                Healing
              </div>
              <div>
                <GoDotFill className="text-blue-500 inline-block" /> 5-Star Care
              </div>
              <div>
                <GoDotFill className="text-blue-500 inline-block" /> All Our
                Best
              </div>
              <div>
                <GoDotFill className="text-blue-500 inline-block" /> Believe in
                us
              </div>
              <div>
                <GoDotFill className="text-blue-500 inline-block" /> A Legacy of
                Excellence
              </div>
              <div>
                <GoDotFill className="text-blue-500 inline-block" /> Always Care
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-700 text-base md:text-lg text-justify font-semibold">
              At our medical center, we combine modern technology with expert
              medical care to provide the best possible treatment for every
              patient. Our dedicated team of doctors and healthcare
              professionals ensures compassionate, personalized care in a safe
              and supportive environment — because your health and well-being
              are our highest priority.
            </p>
          </div>
        </div>

        {/* Right Images */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <img
            src={nurses}
            alt="nurse"
            className="w-full h-60 md:h-52 object-cover rounded"
          />
          <img
            src={nurse}
            alt="nurse-care"
            className="w-full h-52 md:h-52 object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default OurService;
