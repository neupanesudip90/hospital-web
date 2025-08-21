import React from 'react'
import logo from "../assets/clinicLogo.png"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {Link} from "react-router-dom"

function Footer() {
  return (
    <div className="bg-blue-900 text-white mt-15">
      <div className="container mx-auto flex lg:flex-row flex-col md:justify-between py-8 text-center md:text-left ">
        <div className="lg:w-2/6 w-full flex flex-col items-center lg:items-start">
          <img src={logo} alt="Clinic Logo" className="h-15 w-30 " />
          <p className="text-gray-200 mt-2 text-md font-semibold">
            Leading the Way in Medical Excellence <br />
            and Trusted care
          </p>
        </div>
        <div className='w-full lg:w-4/6 flex flex-col md:flex-row justify-between items-start  mt-5 lg:mt-0'>
          <div className="lg:w-1/4 md:w-1/3 w-full mt-5 lg:mt-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-md font-semibold">
              <li className="mb-1">
                <Link to="/ourservices" className="hover:text-gray-500">
                  Services
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/aboutus" className="hover:text-gray-500">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="hover:text-gray-500">
                  Contact
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/bookappointment" className="hover:text-gray-500">
                  Book Appointment
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/doctors" className="hover:text-gray-500">
                  Our Doctors
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4 md:w-1/3 w-full mt-5 lg:mt-0">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="text-md font-semibold">
              <li className="mb-1">+1 234 567 890</li>
              <li className="mb-1">info@hospital.com</li>
              <li className="mb-1">123 Main St,Anytown, USA</li>
              <li className="mb-1">Mon-Fri: 9am - 5pm</li>
              <li className="mb-1">Sat-Sun: Emergency Only</li>
            </ul>
          </div>
          <div className="lg:w-2/4 text-md font-semibold md:w-1/3 w-full mt-5 lg:mt-0 lg:ml-5">
            <p>NewsLetter</p>
            <p>Subscribe to our newsletter for the latest updates</p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded bg-gray-700 text-white w-full mb-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded text-sm py-2 px-3 hover:bg-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className=" text-white border-t border-gray-100 mt-5 py-2 flex justify-between items-center container mx-auto">
        <p>&copy; 2023 Hospital Website. All rights reserved.</p>
        <div className="flex justify-center items-center">
          <a
            href="https://www.facebook.com"
            className="text-white mx-2 hover:text-blue-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            className="text-white mx-2 hover:text-pink-800"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com"
            className="text-white mx-2 hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;