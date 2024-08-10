"use client"; // Mark this component as a Client Component

import { usePathname } from "next/navigation";
import Navbar from "./component/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

 
  const showNavbar = pathname !== "/api/auth/signin" && pathname !== "/auth/signup";

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
