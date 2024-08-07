'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getData } from "../service/apiService"; 
import JobItem  from "../component/JobItem";


export interface JobType {
  id:string
  title:string 
  company:string
  description:string
  categories:string[]
}
const JobList = () => {
  const [data, setData] = useState<JobType[]>([]);
  const [sortOrder, setSortOrder] = useState("most_relevant");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.data);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    // Perform sorting based on sortOrder
    // Example: sort data accordingly here
  };


  return (
    <main className="mt-[72px] ml-[122px] w-[1200px]">
      <div className="flex justify-between align-middle pb-5">
        <div>
          <h1 className="text-2xl font-bold">Opportunities</h1>
          <p className="text-base text-gray-400">Showing {data.length} results</p>
        </div>
        <div>
          Sort by{" "}
          <select name="sort" id="sort" className="" value={sortOrder} onChange={handleSortChange}>
            <option value="most_relevant" className="p-2">Most relevant</option>
            <option value="farthest_deadline" className="p-2">Farthest Deadline</option>
            <option value="nearest_deadline" className="p-2">Nearest Deadline</option>
          </select>
        </div>
      </div>
      <ul>
      {data.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </ul>
    </main>
  );
};

export default JobList;
