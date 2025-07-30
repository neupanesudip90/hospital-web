import React from 'react'
import logo from "../assets/clinicLogo.png";
import { LuPhoneCall } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function Topbar() {
    return (
      <div className="bg-white w-full">
        <div className="container flex  flex-col md:flex-row md:justify-between items-center py-3 ">
          <div className="flex items-start justify-center">
            <img
              src={logo}
              alt="Clinic Logo"
              className="h-10 md:h-12 lg:h-15"
            />
          </div>
          <div>
            <ul className="flex text-gray-600 justify-between items-center text-xs gap-5 md:gap-5 py-2">
              <li className="flex items-center gap-1">
                <div className="text-sm md:text-lg text-blue-500">
                  <LuPhoneCall />
                </div>
                <div>
                  <p className="font-semibold text-gray-500 text-[10px] md:text-[12px]">
                    EMERGENCY CALL
                  </p>
                  <p className="text-blue-400 font-semibold text-[7px] md:text-[12px]">
                    +123 456 7890
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-1 ">
                <div className="text-md md:text-lg text-blue-500">
                  <MdAccessTime />
                </div>
                <div>
                  <p className="font-semibold text-gray-500 text-[10px] md:text-[12px]">
                    WORKING HOURS
                  </p>
                  <p className="text-blue-400 font-semibold text-[7px] md:text-[12px]">
                    9:00 AM - 5:00 PM EVERYDAY
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-1">
                <div className="text-xs md:text-lg text-blue-500">
                  <FaLocationDot />
                </div>
                <div>
                  <p className="font-semibold text-gray-500 text-[10px] md:text-[12px]">
                    OUR LOCATION
                  </p>
                  <p className="text-blue-400 font-semibold text-[7px] md:text-[12px]">
                    123 Clinic St, Health City
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Topbar
