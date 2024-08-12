import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Bookmarks from "@/app/bookmarks/page"; // Update this with the correct import path
import BookmarkList from "@/app/component/BookmarkList"; // Update this with the correct import path

jest.mock("next-auth/react");

const mockSession = {
  user: {
    accessToken: "mockAccessToken",
  },
};

const mockBookmarks = [
  {
    eventID: "1",
    logoUrl: "/path/to/logo1.png",
    title: "Job 1",
    orgName: "Company 1",
    dateBookmarked: "2023-08-10",
    opType: "Full-time",
  },
  {
    eventID: "2",
    logoUrl: "/path/to/logo2.png",
    title: "Job 2",
    orgName: "Company 2",
    dateBookmarked: "2023-08-11",
    opType: "Part-time",
  },
];

describe("Bookmarks Component", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockBookmarks }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays bookmarks", async () => {
    await act(async () => {
      render(<Bookmarks />);
    });

    expect(screen.getByText("My Bookmarks")).toBeInTheDocument();

    await waitFor(() => {
      mockBookmarks.forEach((bookmark) => {
        expect(screen.getByText(bookmark.title)).toBeInTheDocument();
        expect(screen.getByText(bookmark.orgName)).toBeInTheDocument();
      });
    });
  });

  it("removes a bookmark when the bookmark button is clicked", async () => {
    await act(async () => {
      render(<Bookmarks />);
    });

    await waitFor(() => {
      mockBookmarks.forEach((bookmark) => {
        expect(screen.getByText(bookmark.title)).toBeInTheDocument();
      });
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const bookmarkRemoveButton = screen.getAllByTestId("bookmark-remove-button")[0]; // Assuming the first bookmark
    fireEvent.click(bookmarkRemoveButton);

    await waitFor(() => {
      expect(screen.queryByText(mockBookmarks[0].title)).not.toBeInTheDocument();
    });
  });
});

describe("BookmarkList Component", () => {
  it("removes a bookmark when the remove button is clicked", async () => {
    const mockRemoveBookmark = jest.fn();
    render(<BookmarkList bookmark={mockBookmarks[0]} onRemoveBookmark={mockRemoveBookmark} />);

    const bookmarkRemoveButton = screen.getByTestId("bookmark-remove-button");
    fireEvent.click(bookmarkRemoveButton);

    await waitFor(() => {
      expect(mockRemoveBookmark).toHaveBeenCalledWith(mockBookmarks[0].eventID);
    });
  });
});
