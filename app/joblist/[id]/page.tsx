'use client'
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPlusCircle } from "react-icons/fa";
import { FaFireFlameCurved, FaRegCalendarCheck } from "react-icons/fa6";
import { TiLocationOutline } from "react-icons/ti";
import { LuCalendarClock } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";


import { getJobById } from "../../service/apiService";
import type { JobDetails } from "@/app/types/jobTypes";
import { formatDate } from "@/app/utils/dataFormatting";
import Loading from "@/app/loading";

interface Props {
  params: { id: string };
}


const JobDetails = ({ params: { id } }: Props) => {
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const data = await getJobById(id);
        setJob(data.data);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);



  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <Loading/>
  }

  return (
    <main className="grid grid-cols-3 gap-10 m-24">
      <div className="col-span-2 mt-[46px]">
        <h1 className="font-bold text-2xl mb-3">Description</h1>
        <p className="mb-6">{job.description}</p>
        <h1 className="font-bold text-2xl mb-3">Responsibilities</h1>
        <div className="flex gap-2 mb-5">
          <FaRegCheckCircle size={24} color="#15803d" />
          <p>{job.responsibilities}</p>
        </div>
        <h1 className="font-bold text-2xl mt-4 mb-3">Ideal Candidates we Want</h1>
        <div className="flex items-center space-x-3 mb-6">
          <GoDotFill className="text-lg" />
          <span>{job.idealCandidate}</span>
        </div>
        <h1 className="font-bold text-2xl mb-3">When & Where</h1>
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-xl" color="#26A4FF" />
          <p>{job.whenAndWhere}</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-2xl">About</h1>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 w-full">
            <FaPlusCircle className="text-xl" color="#26A4FF" />
            <p>
              Posted On{" "}
              <span className="font-semibold block">{formatDate(job.datePosted)}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaFireFlameCurved className="text-xl" color="#26A4FF" />
            <p>
              Deadline{" "}
              <span className="font-semibold block">{formatDate(job.deadline)}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <TiLocationOutline className="text-xl" color="#26A4FF" />
            <p>
              Location{" "}
              <span className="font-semibold block">{job.location[0]}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <LuCalendarClock className="text-xl" color="#26A4FF" />
            <p>
              Start Date{" "}
              <span className="font-semibold block">{formatDate(job.startDate)}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaRegCalendarCheck className="text-xl" color="#26A4FF" />
            <p>
              End Date{" "}
              <span className="font-semibold block">{formatDate(job.endDate)}</span>
            </p>
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-4 mb-3">Categories</h1>
        <div className="flex flex-wrap space-x-2">
          {job.categories.map((category: string, index: number) => (
            <p
              key={index}
              className={`border rounded-full px-2 py-1 min-w-12 text-center ${index % 2 === 0 ? 'text-violet-500' : 'text-amber-500'} mb-2`}
            >
              {category}
            </p>
          ))}
        </div>
        <h1 className="font-bold text-2xl mt-4 mb-3">Required Skills</h1>
        <div>
          <ul className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, index) => (
              <li
                key={index}
                className="bg-[#F8F8FD] m-2 rounded p-1 text-[#4640DE]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
