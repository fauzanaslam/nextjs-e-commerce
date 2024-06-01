import React from "react";
import LoginButton from "../buttons/LoginButton";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 bg-slate-500 px-10">
      <h2 className="text-2xl font-semibold text-white">fatStore</h2>
      <LoginButton />
    </nav>
  );
};

export default Navbar;
