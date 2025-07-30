import React from "react";
import doctorPhoto from "../../assets/doctor.jpg";
import BreadCrumb from "../../components/BreadCrumb";
import News from "../../components/News";
import Contact from "../../components/Contact";

function ContactUs() {
  return (
    <div>
      {/* Banner */}
      <div
        className="w-full bg-cover bg-center relative py-5 h-70 mb-10"
        style={{ backgroundImage: `url(${doctorPhoto})` }}
      >
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-start justify-center h-full text-center">
          <BreadCrumb />
          <p className="text-5xl font-bold text-blue-950">Contact Us</p>
        </div>
      </div>

      {/* Google Map */}
      <div className="container mx-auto ">
        <iframe
          title="Lifeline Medical Center Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28244.654212495392!2d85.2777883280968!3d27.761042900024435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1f3783a7cd51%3A0xb099e2eecff2760e!2sDharmasthali%2C%20Tarakeshwar%2044600!5e0!3m2!1sen!2snp!4v1753872681772!5m2!1sen!2snp"
          className="w-full h-[450px] rounded-lg shadow-md"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
          </div>
          <div className=" mt-15 ">
                  <News />
                </div>
                <div className="mt-10">
                  <Contact />
                </div>
    </div>
  );
}

export default ContactUs;
