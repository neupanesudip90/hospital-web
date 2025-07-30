import React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

const nameMap = {
  "services": "Services",
  "cardiology": "Cardiology",
    "doctor-john": "Dr. John",
  
};

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link className="text-blue-950 text-md font-bold" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography
            key={to}
            sx={{ color: "#172554", fontSize: "1.125rem", fontWeight: "bold" }}
          >
            {nameMap[value] || value}
          </Typography>
        ) : (
          <Link
            sx={{ color: "#172554", fontSize: "1.125rem", fontWeight: "bold" }}
            to={to}
            key={to}
          >
            {nameMap[value] || value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
