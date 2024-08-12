"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {redirect} from 'next/navigation';
import BookmarkList from '../component/BookmarkList'; 
import Loading from "../loading";

const Bookmarks = () => {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!session){
      redirect('/api/auth/signin');
    };

    const fetchData = async () => {
      try {
        const res = await fetch("https://akil-backend.onrender.com/bookmarks", {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Not Accessible");
        }

        const bookmarks_data = await res.json();
        setBookmarks(bookmarks_data.data);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchData();
  }, [session]);

  // Handler to remove a bookmark from the state
  const handleRemoveBookmark = (eventID) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.eventID !== eventID)
    );
  };
  if (bookmarks.length === 0) return <Loading />;
  return (
    <main className="flex items-center flex-col mt-20">
      <h1 className="text-4xl font-bold h-28 pt-8 bg-gray-50 shadow w-full text-center">
        My Bookmarks
      </h1>
      <div className="w-[60%] mt-6">
        <h1 className="text-4xl font-bold">{bookmarks.length} Bookmarks</h1>
        {bookmarks.map((bookmark) => (
          <BookmarkList 
            key={bookmark.eventID} 
            bookmark={bookmark} 
            onRemoveBookmark={handleRemoveBookmark} 
          />
        ))}
      </div>
    </main>
  );
};

export default Bookmarks;
