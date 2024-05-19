import React from "react";
import MobileSidebar from "../sidebar/MobileSidebar";
import NavbarRoutes from "./NavbarRoutes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
