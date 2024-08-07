import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import JobList from "./joblist/page";


export default async function  Home({searchParams}) {
  const session = await getServerSession(options);
    const callbackUrl = searchParams?.callbackUrl || "/";
    
    if (!session) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
    }
  return (
    <main>
      <JobList />
    </main>
  );
}
