import React from "react";
import doctorPhoto from "../../assets/doctor.jpg";
import BreadCrumb from "../../components/BreadCrumb";
import nurse from "../../assets/nursePose.jpg";
import { GoDotFill } from "react-icons/go";
import Slider from "../../components/slider"
import News from "../../components/News";
import Contact from "../../components/Contact";

function AboutUs() {
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
          <p className="text-5xl font-bold text-blue-950">About Us</p>
        </div>
      </div>
      <div className="mt-20 ">
        <div className="container mx-auto flex flex-col lg:flex-row  gap-10 justify-between">
          <img
            src={nurse}
            alt="Nurse"
            className="w-160 md:h-[500px] h-[300px] "
          />
          <div className=" flex flex-col gap-2">
            <p className="text-2xl md:text-2xl text-gray-700 font-bold ">
              A passion for putting patients first
            </p>
            <div className="flex  items-start gap-2 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-5 text-lg text-gray-700 font-semibold ">
                <div>
                  <GoDotFill className="text-blue-500 inline-block" /> Passion
                  for Healing
                </div>
                <div>
                  <GoDotFill className="text-blue-500 inline-block" /> 5-Star
                  Care
                </div>
                <div>
                  <GoDotFill className="text-blue-500 inline-block" /> All Our
                  Best
                </div>
                <div>
                  <GoDotFill className="text-blue-500 inline-block" /> Believe
                  in us
                </div>
                <div>
                  <GoDotFill className="text-blue-500 inline-block" /> A Legacy
                  of Excellence
                </div>
                <div>
                  <GoDotFill className="text-blue-500 inline-block" /> Always
                  Care
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
                are our highest priority.Book an appointment today to experience
                the difference in healthcare excellence.We are committed to
                providing the highest quality of care to our patients. Our team
                of experienced healthcare professionals is dedicated to ensuring
                that you receive the best possible treatment and support
                throughout your healthcare journey. We look forward to serving
                you and being a part of your journey to better health.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 ">
        <div className="container mx-auto text-center">
          <p className="text-blue-500 text-2xl mt-3 font-bold text-center">
            TRUSTED CARE
          </p>
          <p className="text-blue-950 font-bold text-4xl mt-2 text-center">
            Our Doctors
          </p>
          <div className="mt-10">
            <Slider />
          </div>
          <div />
        </div>
      </div>
      <div className="container ">
        <News />
      </div>
      <div className="mt-10">
        <Contact />
      </div>
    </div>
  );
}

export default AboutUs;
