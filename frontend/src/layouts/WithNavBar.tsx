import * as React from "react";

import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import { Outlet } from "react-router-dom";

const WithNavBar = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <BottomBar />
    </>
  );
};

export default WithNavBar;
