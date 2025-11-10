import React from "react";
import "@/app/globals.css";
import "@/app/normalize.css";

const InstructionsLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default InstructionsLayout;
