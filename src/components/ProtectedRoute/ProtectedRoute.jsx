import React from "react";
import { Navigate } from "react-router-dom";

const ProctectedRouteElement = ({ element: Component, ...props }) => {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/" />;
};

export default ProctectedRouteElement;
