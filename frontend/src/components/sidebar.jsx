import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { RiCustomerService2Fill } from "react-icons/ri";
import { LiaNewspaperSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import logo from "../assets/clinicLogo.png"
import { RxCross1 } from "react-icons/rx";

export default function Sidebar({ toggleMobileMenu }) {
  const itemList = [
    {
      label: "Home",
      link: "/",
      icon: <IoHomeOutline className="text-blue-950 text-2xl" />,
    },
    {
      label: "About Us",
      link: "/aboutus",
      icon: <FcAbout className="text-blue-950 text-2xl" />,
    },
    {
      label: "Our Services",
      link: "/ourservices",
      icon: <RiCustomerService2Fill className="text-blue-950 text-2xl" />,
    },
    {
      label: "Doctors",
      link: "/doctors",
      icon: <FaUserDoctor className="text-blue-950 text-2xl" />,
    },
    {
      label: "News",
      link: "/news",
      icon: <LiaNewspaperSolid className="text-blue-950 text-2xl" />,
    },
    {
      label: "Contact Us",
      link: "/contact",
      icon: <IoCallOutline className="text-blue-950 text-2xl" />,
    },
  ];
  const DrawerList = (
    <Box
      sx={{ width: 300, backgroundColor: "#f0f4f8", height: "100%" }}
      onClick={toggleMobileMenu}
      onKeyDown={toggleMobileMenu}
    >
      <div className="flex gap-20 justify-center items-center">
        <img src={logo} alt="Logo" className="px-1 py-5 h-28 " />
        <RxCross1 className="text-blue-950 text-3xl font-bold cursor-pointer" onClick={toggleMobileMenu} />
      </div>

      <List>
        {itemList.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            className="border-t-1 border-gray-400 w-full"
          >
            <ListItemButton>
              <Link to={item.link} className="flex gap-2 items-center p-2">
                {item.icon}
                <p className="text-blue-950 font-bold text-lg">{item.label}</p>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleMobileMenu}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={toggleMobileMenu}
        anchor="left"
        //adding sliding smooth transition and animation
        transition={{ duration: 1500 }}
        transitionDuration={{ enter: 800, exit: 800 }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
Sidebar.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
};
