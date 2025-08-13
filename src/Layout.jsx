import React from "react";
import { Outlet } from "react-router";

import ResponsiveAppBar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
