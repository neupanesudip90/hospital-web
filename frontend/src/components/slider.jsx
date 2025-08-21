import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { getAllDoctors } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

// import required modules
import { Autoplay } from "swiper/modules";
import { useEffect } from "react";
export default function Slider() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1000}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay]}
      className="mySwiper"
      breakpoints={{
        340: {
          slidesPerView: 1, // 1 column on small screens
        },
        768: {
          slidesPerView: 2, // 2 columns on medium screens
        },
        1024: {
          slidesPerView: 3, // 3 columns on large screens
        },
      }}
    >
      {doctors.map((doctor, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center  ">
          <img
            src={doctor.profilePicture}
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
