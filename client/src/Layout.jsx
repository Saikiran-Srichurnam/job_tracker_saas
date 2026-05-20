import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import React from "react";

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
