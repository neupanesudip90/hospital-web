import React, { useState, useEffect } from "react";
import logo from "../assets/doctor3.jpeg";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./sidebar";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import PropTypes from "prop-types";
import ConfirmModal from "./confirmModel";

function Dropdown({ onClose }) {
  const navigate = useNavigate();

  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutModal(false);
    handleLogout(); // perform logout
  };
  const dropdownItems = [
    {
      label: "Profile",
      icon: <FaCircleUser className="text-xl" />,
      onClick: () => {
        navigate("/patient/profile");
        onClose();
      },
    },
    {
      label: "History ",
      icon: <FaHistory className="text-xl" />,
      onClick: () => {
        navigate("/patient/appointments");
        onClose();
      },
    },
    {
      label: "Logout",
      icon: <CiLogin className="text-xl" />,
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="absolute lg:-left-5  top-10 mt-2 bg-blue-900 rounded-b-md shadow-lg z-50">
      <ul className="py-1 ">
        {dropdownItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center px-4 py-2 hover:bg-blue-950 cursor-pointer"
            onClick={item.onClick}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </li>
        ))}
      </ul>
      <ConfirmModal
        isOpen={logoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutModal(false)}
      />
    </div>
  );
}

Dropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigate = useNavigate();

  const activeLinkStyle = {
    textDecoration: "underline",
    color: "white",
    fontWeight: "bold",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  const isPatientLoggedIn = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "patient";
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (isPatientLoggedIn()) {
      navigate("/bookappointment");
    } else {
      setModalOpen(true);
    }
  };
  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/login"); // go to login when user clicks Yes
  };

  const handleCancel = () => {
    setModalOpen(false); // close modal
  };

  return (
    <>
      {/* Desktop Navbar */}
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
              <button
                onClick={handleClick}
                className="text-md font-bold text-gray-200 hover:text-blue-300"
              >
                Book Appointment
              </button>

              <ConfirmModal
                isOpen={modalOpen}
                title="You are not logged in!"
                message="Do you want to login before booking an appointment?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            </div>
            {!isPatientLoggedIn() ? (
              <div className="flex items-center gap-3">
                <ul className="flex justify-end items-center gap-2">
                  <Link to="/login" className="inline-block mr-6">
                    Login
                  </Link>
                  <Link to="/register" className="inline-block mr-6">
                    Register
                  </Link>
                </ul>
              </div>
            ) : (
              <div className="relative dropdown ">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={logo}
                    alt="Clinic Logo"
                    className="h-10 w-10 rounded-full"
                  />
                </button>

                {showDropdown && (
                  <Dropdown onClose={() => setShowDropdown(false)} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
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
              <div>
                <button
                  onClick={handleClick}
                  className="text-md font-bold text-gray-200 hover:text-blue-300"
                >
                  Book Appointment
                </button>

                <ConfirmModal
                  isOpen={modalOpen}
                  title="You are not logged in!"
                  message="Do you want to login before booking an appointment?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              </div>
              {!isPatientLoggedIn() ? (
                <div className="flex items-center gap-3">
                  <ul className="flex justify-end items-center gap-2">
                    <Link to="/login" className="inline-block mr-6">
                      Login
                    </Link>
                    <Link to="/register" className="inline-block mr-6">
                      Register
                    </Link>
                  </ul>
                </div>
              ) : (
                <div className="relative dropdown ">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img
                      src={logo}
                      alt="Clinic Logo"
                      className="h-10 w-10 rounded-full"
                    />
                  </button>

                  {showDropdown && (
                    <Dropdown onClose={() => setShowDropdown(false)} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Navbar.propTypes = {
  toggleMobileMenu: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default Navbar;
