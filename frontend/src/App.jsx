import React from 'react'
import Home from "./pages/Homepage/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topbar from  "./components/topbar";
import Navbar from "./components/Navbar";     
import Footer from "./components/Footer";
import OurService from "./pages/ourService/ourService";
import AboutUs from "./pages/AboutUs/AboutUs";
import Doctors from "./pages/doctors/Doctors";
import News from "./pages/News/News";
import ContactUs from "./pages/contactUs/contact";

function App() {
  return (
    <>
        <Topbar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourservices" element={<OurService />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/doctors" element={<Doctors />} />
        <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />

    </>
  );
}

export default App
