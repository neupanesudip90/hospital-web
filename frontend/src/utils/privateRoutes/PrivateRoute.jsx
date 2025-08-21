import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if (!token) {
    // 🔒 No token, redirect to login
    return <Navigate to="/login" />;
  }

  role = role?.trim().toLowerCase();
  const allowedRoles = roles.map((r) => r.toLowerCase());

  if (!role || !allowedRoles.includes(role)) {
    // 🔒 Invalid or unauthorized role
    return <Navigate to="/login" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
  roles: [],
};

export default PrivateRoute;
