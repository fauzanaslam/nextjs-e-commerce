"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data } = useSession();

  return (
    <button
      onClick={() => (data ? signOut() : signIn())}
      className="bg-white py-1 px-5 rounded text-md font-semibold hover:bg-slate-200"
    >
      {data ? "Logout" : "Login"}
    </button>
  );
};

export default LoginButton;
