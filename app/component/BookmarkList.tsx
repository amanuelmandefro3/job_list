import { useState } from "react";
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "../loading";

interface Bookmark {
  eventID: string;
  logoUrl: string;
  title: string;
  orgName: string;
  dateBookmarked: string;
  opType: string;
}

interface BookmarkListProps {
  bookmark: Bookmark;
  onRemoveBookmark: (eventID: string) => void;
}

const BookmarkList = ({ bookmark, onRemoveBookmark }: BookmarkListProps) => {
  const { data: session } = useSession();
  const [isRemoving, setIsRemoving] = useState(false);

  const removeBookmark = async () => {
    setIsRemoving(true);
    try {
      const res = await fetch(
        `https://akil-backend.onrender.com/bookmarks/${bookmark.eventID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (res.ok) {
        onRemoveBookmark(bookmark.eventID); 
      } else {
        console.error("Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error.message);
    } finally {
      setIsRemoving(false);
    }
  };

  

  return (
    <Link href={`/joblist/${bookmark.eventID}`}>
      <div className="w-full border shadow rounded-xl mt-4 flex gap-4 pl-2 items-center min-h-32 relative hover:bg-gray-100">
        <Image src={bookmark.logoUrl} width={65} height={59} alt="org logo" />
        <div>
          <div
            onClick={(e) => {
              e.preventDefault();
              if (!isRemoving) {
                removeBookmark();
              }
            }}
            data-testid="bookmark-remove-button"
            className="absolute top-4 right-4 cursor-pointer"
          >
            {isRemoving ? <Loading /> : <FaBookmark />}
          </div>
          <h1 className="text-2xl font-bold my-2">{bookmark.title}</h1>
          <p className="text-base text-gray-400 my-2 font-semibold">
            {bookmark.orgName}
          </p>
          <p>
            Bookmarked on:{" "}
            {new Date(bookmark.dateBookmarked).toLocaleDateString()}
          </p>
          <p className="border my-2 max-w-24 px-2 py-1 text-center rounded-xl bg-[#8a86e7]">
            {bookmark.opType}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookmarkList;
