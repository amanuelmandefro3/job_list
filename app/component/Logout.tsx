'use client'
import { signOut } from "next-auth/react"
const Logout = () => {
  return (
    <li
    className="border px-4 rounded-full border-[#8a95d5] min-w-[120px] text-center cursor-pointer "
    onClick={() => signOut({ callbackUrl: "/" })}
  >
    Logout
  </li>

  )
}

export default Logout