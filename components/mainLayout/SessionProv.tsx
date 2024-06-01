"use client";

import { SessionProvider } from "next-auth/react";

const SessionProv = ({ children }: any) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default SessionProv;
