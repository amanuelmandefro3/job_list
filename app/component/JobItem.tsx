import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JobType } from "../joblist/page";

const JobItem = ({ job }: JobType) => (
  <Link href={`/joblist/${job.id}`} key={job.id}>
    <li className="flex gap-2 border mb-3 rounded-xl pl-4 pt-2 pb-2 pr-2 hover:bg-gray-200">
      <div className="flex-shrink-0">
        <Image
          src={job.logoUrl} // Replace with actual src
          alt="job description"
          width={66}
          height={59}
          className="object-cover"
        />
      </div>
      <div className="job-info">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-base text-gray-400 pb-2">{job.orgName} {job.location[0]}</p>
        <p className="pb-2">{job.description}</p>
        <div className="flex justify-start gap-3">
          <p className="border rounded-full px-2 py-1 bg-green-100 text-green-500 min-w-24 align-middle">In Person</p>
          {
            job.categories.map((category: string, index: number) => (
              <p
                key={index}
                className={`border rounded-full px-2 py-1 min-w-12 text-center ${index % 2 === 0 ? 'text-violet-500' : 'text-amber-500'}`}
              >
                {category}
              </p>
            ))
          }
        </div>
      </div>
    </li>
  </Link>
);

export default JobItem;
