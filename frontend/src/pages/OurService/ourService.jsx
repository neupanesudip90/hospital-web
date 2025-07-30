import React from 'react'
import doctorPhoto from "../../assets/doctor.jpg"
import BreadCrumb from "../../components/BreadCrumb"
import doctorPatient from "../../assets/doctor-patient.jpeg"
import doctorPatient1 from "../../assets/doctor-patient1.jpeg";
import doctorPatient2 from "../../assets/doctor-patient2.jpeg";
import doctorPatient3 from "../../assets/doctor-patient3.jpeg";
import doctorPatient4 from "../../assets/doctor-patient4.jpeg";
import doctorPatient5 from "../../assets/doctor-patient5.jpeg";
import { MdOutlineHealing } from "react-icons/md";
import Contact from "../../components/Contact";

function OurService() {
  const serviceList = [
    {
      image: doctorPatient,
      title: "General Checkup",
      description: "General checkups are essential for maintaining overall health and preventing potential health issues. They typically include a physical examination, medical history review, and various tests to assess your health status."

    },
    {
      image: doctorPatient1,
      title: "DNA Testing",
      description: "DNA testing is a powerful tool for understanding your genetic makeup. It can provide insights into your ancestry, health risks, and potential responses to certain medications."
    },
    {
      image: doctorPatient2,
      title: "Dental Services",
      description: "Our dental services include routine check-ups, cleanings, and treatments to ensure optimal oral health. We provide comprehensive care for patients of all ages."
    },
    {
      image: doctorPatient3,
      title: "Cardiology",
      description: "Our cardiology department offers specialized care for heart-related conditions. We provide diagnostic testing, treatment plans, and ongoing management for patients with cardiovascular issues."
    },
    {
      image: doctorPatient4,
      title: "Orthopedics",
      description: "Our orthopedic services focus on the diagnosis and treatment of musculoskeletal disorders. We offer both surgical and non-surgical options to help patients regain mobility and reduce pain."
    },
    {
      image: doctorPatient5,
      title: "Blood Bank",
      description: "Our blood bank services ensure a safe and adequate supply of blood and blood products for patients in need. We follow strict protocols for blood collection, testing, and storage to guarantee the highest quality and safety standards."
    }
  ]
  return (
    <div>
      <div
        className="w-full  bg-cover bg-center relative py-5 h-70"
        style={{ backgroundImage: `url(${doctorPhoto})` }}
      >
        {/* Overlay */}
        <div className=" absolute inset-0 bg-white/50"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-start justify-center h-full text-center">
          <BreadCrumb />
          <p className="text-5xl font-bold text-blue-950">Our Services</p>
        </div>
      </div>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-60 object-cover"
              />
              <div className="relative flex items-center justify-center w-16 h-16 bg-blue-950 text-white rounded-full -top-10 -right-68 z-10">
                <MdOutlineHealing className="w-10 h-10" />
              </div>
              <div className="px-6">
                <h3 className="text-xl font-bold text-blue-950">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description.length > 170
                    ? `${service.description.substring(0, 170)}...`
                    : service.description}
                </p>
              </div>
              <div className="p-4">
                <button className="bg-blue-950 text-white py-2 px-4 rounded">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
}

export default OurService
