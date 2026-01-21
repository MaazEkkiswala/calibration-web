"use client";
import { IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import NavBarLayout from "./navBarLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  // here we have to set common layout like sidebar and header
  // so we don't need to handle for auth-login page it will default layout where there is no sidebar and header

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <IconLoader2 className="animate-spin w-8 h-8 text-violet-400" />
        </div>
      ) : (
        <>
          <NavBarLayout>{children}</NavBarLayout>
          {/* <SsNotificationPermission /> */}
        </>
      )}
    </>
  );
}
