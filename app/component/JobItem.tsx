import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { JobType } from "../joblist/page";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const JobItem = ({ job }: JobType) => {
  const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState(job.isBookmarked);

  // setting bookmarked status 
  useEffect(() => {
    setBookmarked(job.isBookmarked);
  }, [session, job.isBookmarked]);

  // Toggle bookmark status (add/remove bookmark)
  const addRemoveBookmark = async () => {
    try {
      const method = bookmarked ? "DELETE" : "POST";
      const res = await fetch(`https://akil-backend.onrender.com/bookmarks/${job.id}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });

      if (res.ok) {
        setBookmarked(!bookmarked);
      } else {
        console.error("Failed to update bookmark status");
      }
    } catch (error) {
      console.log("Error updating bookmark:", error.message);
    }
  };

  // showing job item
  return (
    <Link href={`/joblist/${job.id}`}>
      <li className="flex gap-2 border mb-3 rounded-xl pl-4 pt-2 pb-2 pr-2 ">
        <div className="flex-shrink-0">
          <Image
            src={job.logoUrl}
            alt="job description"
            width={66}
            height={59}
            className="object-cover"
            data-testid="job-logo"
          />
        </div>
        <div className="job-info relative w-full" data-testid="job-info">
          <div>
            <div>
              <h2 className="text-xl font-semibold" data-testid="job-title">{job.title}</h2>
              <p className="text-base text-gray-400 pb-2" data-testid="job-org-location">
                {job.company} {job.location[0]}
              </p>
            </div>
            {session && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  addRemoveBookmark();
                }}
                className="absolute top-4 right-4 cursor-pointer"
                data-testid="bookmark-icon"
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </div>
            )}
          </div>
          <p className="pb-2" data-testid="job-description">{job.description}</p>
          <div className="flex justify-start gap-3" data-testid="job-details">
            <p className="border rounded-full px-2 py-1 bg-green-100 text-green-500 min-w-24 align-middle">
              {job.opType}{" "}
            </p>
            <span className="border-r-4 border-gray-300"></span>
            {job.categories.map((category: string, index: number) => (
              <p
                key={index}
                className={`border rounded-full px-2 py-1 min-w-12 text-center ${
                  index % 2 === 0 ? "text-amber-500" : "text-violet-500"
                }`}
                data-testid={`job-category-${index}`}
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default JobItem;
