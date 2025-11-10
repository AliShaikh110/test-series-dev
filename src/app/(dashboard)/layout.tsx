import React from "react";
import "@/app/globals.css";
import "@/app/normalize.css";
import { Toaster } from "sonner";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>{children}</div>
      <Toaster theme="light" richColors position="top-center" />
    </>
  );
};

export default DashboardLayout;
