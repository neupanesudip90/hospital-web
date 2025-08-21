import React from 'react'
import Topbar from "../components/topbar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <>
            <Topbar/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default Layout
