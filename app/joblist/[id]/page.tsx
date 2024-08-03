import React from "react";
import { FaMapMarkerAlt, FaPlusCircle } from "react-icons/fa";
import { FaFireFlameCurved, FaRegCalendarCheck } from "react-icons/fa6";
import { TiLocationOutline } from "react-icons/ti";
import { LuCalendarClock } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";

import data from "../../jobs.json";
import Responsibility from "../../component/Responsibility";

interface Props {
  params: { id: string };
}

const JobDetails = ({ params: { id } }: Props) => {
  const job = data[+id];

  return (
    <main className="grid grid-cols-3 gap-8 m-8">
      <div className="col-span-2 mt-[46px] w-[920px]">
        <h1 className="font-bold text-2xl mb-3">Description</h1>
        <p className="mb-4">{job.description}</p>
        <h1 className="font-bold text-2xl mb-3">Responsibilities</h1>
        <Responsibility responsibilities={job.responsibilities} />
        <h1 className="font-bold text-2xl mt-4 mb-3">
          Ideal Candidates we Want
        </h1>
        <h3 className="font-bold flex items-center space-x-3">
          <GoDotFill className="text-lg" />
          <span>
            Age({job.ideal_candidate.age}) {job.title}
          </span>
        </h3>
        <ul className="mt-3 mb-4 space-y-2">
          {job.ideal_candidate.traits.map((trait, index) => (
            <li key={index} className="flex items-center space-x-3">
              <GoDotFill className="text-lg" /> <span>{trait}</span>
            </li>
          ))}
        </ul>
        <h1 className="font-bold text-2xl mb-3">When & Where</h1>
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-xl" color="#26A4FF" />
          <p>{job.when_where}</p>
        </div>
      </div>
      <div className="w-[293px]">
        <h1 className="font-bold text-2xl">About</h1>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 w-full">
            <FaPlusCircle className="text-xl" color="#26A4FF" />
            <p>
              Posted On{" "}
              <span className="font-semibold block">{job.about.posted_on}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaFireFlameCurved className="text-xl" color="#26A4FF" />
            <p>
              Deadline{" "}
              <span className="font-semibold block">{job.about.deadline}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <TiLocationOutline className="text-xl" color="#26A4FF" />
            <p>
              Location{" "}
              <span className="font-semibold block">{job.about.location}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <LuCalendarClock className="text-xl" color="#26A4FF" />
            <p>
              Start Date{" "}
              <span className="font-semibold block">
                {job.about.start_date}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaRegCalendarCheck className="text-xl" color="#26A4FF" />
            <p>
              End Date{" "}
              <span className="font-semibold block">{job.about.end_date}</span>
            </p>
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-4 mb-3">Categories</h1>
        <div className="flex space-x-2">
          <p className="bg-amber-100 text-[#EB8533] rounded-full py-2 px-4 min-w-14 text-center">
            {job.about.categories[0]}
          </p>
          <p className="bg-green-100 text-green-600 rounded-full py-2 px-4 min-w-14 text-center">
            {job.about.categories[1]}
          </p>
        </div>
        <h1 className="font-bold text-2xl mt-4 mb-3">Required Skills</h1>
        <div>
          <ul className="flex flex-wrap space-x-3">
            {job.about.required_skills.map((skill, index) => (
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
