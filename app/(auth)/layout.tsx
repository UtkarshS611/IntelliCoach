import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex items-center justify-center mx-auto min-h-screen max-h-7xl max-sm:px-4 max-sm:py-8">
      {children}
    </section>
  );
};

export default AuthLayout;
