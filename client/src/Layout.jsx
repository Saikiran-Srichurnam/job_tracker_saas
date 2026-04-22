import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import React from "react";

function Layout() {
  return (
    <div className="bg-black/80 h-screen w-full text-white flex justify-center items-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
