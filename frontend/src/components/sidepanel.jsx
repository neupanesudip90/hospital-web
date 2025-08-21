import React, { useEffect, useState } from "react";
import cover from "../assets/cover.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoChatbubbleEllipsesOutline,
  IoPersonAdd,
  IoClose,
} from "react-icons/io5";
import { RiCustomerService2Fill, RiCalendarScheduleLine } from "react-icons/ri";
import { FaUser, FaUserDoctor, FaCircleUser } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, clearAuthUser } from "../redux/userSlice";
import ConfirmModal from "./confirmModel";

function Sidepanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.authUser);

  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (token) dispatch(getAuthUser());
  }, [dispatch, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    dispatch(clearAuthUser());
    navigate("/login");
  };

  const handleConfirm = () => {
    setModalOpen(false);
    handleLogout();
  };
  const handleCancel = () => setModalOpen(false);

  const itemList = [
    {
      label: "Appointments",
      icon: <RiCustomerService2Fill />,
      link: "/appointments",
    },
    { label: "Patients", icon: <FaUser />, link: "/patients" },
    { label: "Settings", icon: <IoSettingsOutline />, link: "/settings" },
    {
      label: "Messages",
      icon: <IoChatbubbleEllipsesOutline />,
      link: "/messages",
    },
    { label: "Schedule", icon: <RiCalendarScheduleLine />, link: "/schedule" },
    { label: "Profile", icon: <FaCircleUser />, link: "/profile" },
    { label: "Logout", icon: <CiLogin />, action: () => setModalOpen(true) },
  ];

  const SidebarContent = () => (
    <div className="bg-white w-64 shadow-lg flex flex-col h-full relative">
      {/* Cover + Profile */}
      <div className="relative">
        <img src={cover} alt="Cover" className="h-32 w-full object-cover" />
        <img
          src={user?.profilePicture}
          alt="Profile"
          className="h-20 w-20 rounded-full border-4 border-white shadow-md absolute left-1/2 transform -translate-x-1/2 -bottom-10"
        />
        {/* Close btn (only on mobile) */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-white"
          >
            <IoClose className="text-3xl" />
          </button>
        </div>
      </div>

      <div className="mt-14 text-center px-4">
        <p className="text-lg font-semibold">
          {userRole === "doctor"
            ? `Dr. ${user?.name?.toUpperCase() || "N/A"}`
            : user?.name?.toUpperCase() || "N/A"}
        </p>
        <p className="text-gray-500 text-md font-medium">
          {user?.department || "Admin"}
        </p>
        <p className="text-gray-400 text-sm">{user?.bio}</p>
      </div>

      {/* Menu */}
      <ul className="mt-8 border-t border-gray-200 flex-1 overflow-y-auto">
        {(userRole === "doctor" || userRole === "admin") && (
          <li>
            <Link
              to={
                userRole === "doctor" ? "/doctor/dashboard" : "/admin/dashboard"
              }
              className={`flex items-center gap-3 px-5 py-3 font-medium ${
                location.pathname ===
                (userRole === "doctor"
                  ? "/doctor/dashboard"
                  : "/admin/dashboard")
                  ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <IoHomeOutline className="text-xl" /> Dashboard
            </Link>
          </li>
        )}

        {itemList.map((item) => (
          <li key={item.label}>
            {item.link ? (
              <Link
                to={item.link}
                className={`flex items-center gap-3 px-5 py-3 font-medium ${
                  location.pathname === item.link
                    ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ) : (
              <button
                onClick={item.action}
                className="flex items-center gap-3 px-5 py-3 font-medium w-full text-gray-700 hover:bg-gray-100"
              >
                {item.icon} {item.label}
              </button>
            )}
          </li>
        ))}

        {userRole === "admin" && (
          <>
            <li>
              <Link
                to="/alldoctors"
                className="flex items-center gap-3 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <FaUserDoctor className="text-xl" /> All Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/add-doctor"
                className="flex items-center gap-3 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <IoPersonAdd className="text-xl" /> Add Doctor
              </Link>
            </li>
            <li>
              <Link
                to="/add-admin"
                className="flex items-center gap-3 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <IoPersonAdd className="text-xl" /> Add Admin
              </Link>
            </li>
          </>
        )}
      </ul>

      <ConfirmModal
        isOpen={modalOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );

  return (
    <>
      {/* Burger button for sm & md */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-blue-900 text-white rounded-md"
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile Sidebar + Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0  bg-opacity-5 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`fixed top-0 left-0 h-full z-50 transform bg-white transition-transform duration-300 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <SidebarContent />
          </div>
        </>
      )}

      {/* Desktop Sidebar (always visible on lg+) */}
      <div className="hidden lg:block h-full">
        <SidebarContent />
      </div>
    </>
  );
}

export default Sidepanel;
