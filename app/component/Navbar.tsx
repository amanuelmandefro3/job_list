'use client'
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-around items-center w-full h-20 bg-[#e9ebfd]">
      <div className="text-3xl font-bold">Akil</div>
      <ul className="flex justify-end gap-4 text-xl text-[#8a86e7]">
        <Link href="/">
          <li className=" border px-4 rounded-full cursor-pointer hover:border hover:bg-gray-50 hover:rounded-md px-4">
            Home
          </li>
        </Link>

        {status === "authenticated" && (
          <>
            <Link href="/bookmarks">
              <li className=" border px-4 rounded-full cursor-pointer hover:border hover:bg-gray-50 hover:rounded-md px-4">
                Bookmarks
              </li>
            </Link>
            <li className="cursor-pointer">User</li>
            <Logout />
          </>
        )}

        {status !== "authenticated" && (
          <>
            <Link href="/api/auth/signin">
              <li className="border px-4 rounded-full min-w-[120px] text-center cursor-pointer hover:bg-[#8a95d5] hover:text-white hover:border hover:border-[#8a95d5]">
                Login
              </li>
            </Link>
            <Link href="/auth/signup">
              <li className="border border-[#8a95d5] px-4 rounded-full min-w-[120px] text-center cursor-pointer hover:bg-[#8a95d5] hover:text-white hover:border hover:border-[#8a95d5]">
                Sign Up
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
