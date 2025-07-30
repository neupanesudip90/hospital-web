// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import doctor1 from "../assets/doctor1.jpeg";
import doctor2 from "../assets/doctor2.jpg";
import doctor3 from "../assets/doctor3.jpeg";
import doctor4 from "../assets/doctor4.jpg";
import doctor5 from "../assets/doctor5.jpeg";
import doctor6 from "../assets/doctor6.jpeg";
import doctor7 from "../assets/doctor7.avif";
import doctor8 from "../assets/doctor8.jpeg";

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

export default function Slider() {
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
      {doctorList.map((doctor, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center  ">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
