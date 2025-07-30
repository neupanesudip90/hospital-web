import React from "react";
import logo from "../assets/clinicLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import Sidebar from "./sidebar";
import { NavLink } from "react-router-dom"; // use NavLink

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const activeLinkStyle = {
    textDecoration: "underline",
    color: "white",
    fontWeight: "bold"
  };

  return (
    <>
      {/* desktop navbar */}
      <div className="hidden lg:block bg-blue-900 text-white py-4 w-full sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <ul className="flex justify-between items-center gap-8">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-semibold text-md text-gray-50"
              >
                Home
              </NavLink>
              <NavLink
                to="/aboutus"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-semibold text-md text-gray-50"
              >
                About Us
              </NavLink>
              <NavLink
                to="/ourservices"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-semibold text-md text-gray-50"
              >
                Services
              </NavLink>
              <NavLink
                to="/doctors"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-semibold text-md text-gray-50"
              >
                Doctors
              </NavLink>
              <NavLink
                to="/news"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-semibold text-md text-gray-50"
              >
                News
              </NavLink>
              <NavLink
                to="/contact"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-semibold text-md text-gray-50"
              >
                Contact
              </NavLink>
            </ul>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold">Appointment</h1>
            </div>
            <div>
              <ul className="flex justify-end items-center gap-2">
                <li className="inline-block mr-6">Login</li>
                <li className="inline-block mr-6">Register</li>
                <img
                  src={logo}
                  alt="Clinic Logo"
                  className="h-8 w-8 rounded-[50%]"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* mobile navbar */}
      <div className="sticky top-0 z-50">
        <div className="lg:hidden bg-blue-900 text-white py-3 w-full ">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <button onClick={toggleMobileMenu}>
                <RxHamburgerMenu className="text-2xl" />
              </button>
            </div>
            {isMobileMenuOpen && (
              <Sidebar toggleMobileMenu={toggleMobileMenu} />
            )}
            <div className="flex justify-between items-center gap-3">
              <p className="text-lg font-semibold">Appointment</p>
              <img
                src={logo}
                alt="Clinic Logo"
                className="h-10 w-10 rounded-[50%]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
