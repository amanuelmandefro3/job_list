'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getData } from "../service/apiService"; 
import JobItem  from "../component/JobItem";
import Loading from '../loading'

export interface JobType {
  id: string;
  title: string;
  company: string;
  description: string;
  categories: string[];
}

const JobList = () => {
  const [data, setData] = useState<JobType[]>([]);
  const [sortOrder, setSortOrder] = useState("most_relevant");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.data);
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
  if(data.length === 0) return <Loading/>

  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="w-[1200px]  mt-24 overflow-hidden">
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
    </div>
  );
};

export default JobList;
