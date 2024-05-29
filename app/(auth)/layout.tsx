import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="h-full w-full bg-[rgba(0,0,0,0.4)] absolute top-0 left-0" />
      {children}
    </div>
  );
};

export default AuthLayout;
