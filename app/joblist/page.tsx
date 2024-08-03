'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import data from "../jobs.json";
import { sort } from 'fast-sort';

interface Props {
  params?: { sortOrder?: string }
}

const JobList = ({ params = {} }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSortOrder = searchParams.get("sortOrder") || params.sortOrder || "most_relevant";
  const [sortOption, setSortOption] = useState(initialSortOrder);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    if (params.sortOrder && params.sortOrder !== sortOption) {
      setSortOption(params.sortOrder);
    }
  }, [params.sortOrder]);

  useEffect(() => {
    const querySortOrder = searchParams.get("sortOrder");
    if (querySortOrder && querySortOrder !== sortOption) {
      setSortOption(querySortOrder);
    }
  }, [searchParams]);

  useEffect(() => {
    let sorted = [...data];
    switch (sortOption) {
      case 'farthest_deadline':
        sorted = sort(sorted).desc(job => new Date(job.about.deadline));
        break;
      case 'nearest_deadline':
        sorted = sort(sorted).asc(job => new Date(job.about.deadline));
        break;
      default:
        break;
    }
    setSortedData(sorted);
  }, [sortOption]);

  console.log("Current sort option:", sortOption);
  console.log("Sorted data:", sortedData);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    router.push(`?sortOrder=${value}`);
  };

  return (
    <main className="mt-[72px] ml-[122px] w-[920px]">
      <div className="flex justify-between align-middle pb-5">
        <div>
          <h1 className="text-2xl font-bold">Opportunities</h1>
          <p className="text-base text-gray-400">Showing {sortedData.length} results</p>
        </div>
        <div>
          Sort by{" "}
          <select
            name="sort"
            id="sort"
            className=""
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="most_relevant" className="p-2">
              Most relevant
            </option>
            <option value="farthest_deadline" className="p-2">
              Farthest Deadline
            </option>
            <option value="nearest_deadline" className="p-2">
              Nearest Deadline
            </option>
          </select>
        </div>
      </div>
      <ul className="">
        {sortedData.map((job, index) => (
          <Link href={`/joblist/${index}`} key={index}>
            <li className="flex gap-2 border mb-3 rounded-xl pl-4 pt-2 pb-2 pr-2 hover:bg-gray-200">
              <div className="flex-shrink-0">
                <Image
                  src={`/Image${job.image}`}
                  alt="job description"
                  width={66}
                  height={59}
                  className="object-cover"
                />
              </div>
              <div className="job-info">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-base text-gray-400 pb-2">
                  {job.company} {job.about.location}
                </p>
                <p className="pb-2">{job.description}</p>
                <div className="flex justify-start gap-3">
                  <p className="border rounded-full px-2 py-1 bg-green-100 text-green-500 min-w-5">
                    In Person
                  </p>
                  <p className="border rounded-full px-2 py-1 text-amber-500 min-w-12 text-center">
                    {job.about.categories[0]}
                  </p>
                  <p className="border rounded-full px-2 py-1 text-violet-500 min-w-12 text-center">
                    {job.about.categories[1]}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
};

export default JobList;
