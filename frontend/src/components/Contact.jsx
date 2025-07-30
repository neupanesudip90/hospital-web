import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdWifiCalling3 } from "react-icons/md";
import { FaClock } from "react-icons/fa6";

function Contact() {
  return (
      <div className="container mx-auto mt-20 text-center">
        <p className="text-blue-500 text-2xl mt-3 font-bold text-center">
          GET IN TOUCH
        </p>
        <p className="text-blue-950 font-bold text-2xl mt-2 text-center">
          CONTACT
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5 text-left text-blue-950 font-semibold">
          <div className="bg-blue-300 rounded-md shadow-lg p-8 ">
            <FaLocationDot className="inline text-blue-500 text-4xl" />
            <p className="text-xl font-bold mt-3">LOCATION</p>
            <p>123 Main St, Anytown, USA</p>
          </div>
          <div className="bg-blue-950 rounded-md shadow-lg p-8 text-white">
            <MdMarkEmailUnread className="inline  text-4xl" />
            <p className="text-xl font-bold mt-3">EMAIL</p>
            <p>info@hospital.com</p>
            <p>support@hospital.com</p>
          </div>
          <div className="bg-blue-300 rounded-md shadow-lg p-8">
            <FaClock className="inline text-blue-500 text-4xl" />
            <p className="text-xl font-bold mt-3">WORKING HOURS</p>
            <p>Mon-Fri: 9am - 5pm</p>
            <p>Sat-Sun: Emergency Only</p>
          </div>
          <div className="bg-blue-300 rounded-md shadow-lg p-8">
            <MdWifiCalling3 className="inline text-blue-500 text-4xl" />
            <p className="text-xl font-bold mt-3">PHONE</p>
            <p>(123) 456-7890</p>
            <p>(123) 456-7891</p>
          </div>
        </div>
      </div>
  );
}

export default Contact
