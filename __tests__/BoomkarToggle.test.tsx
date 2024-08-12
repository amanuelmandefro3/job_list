import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

// Mocked JobItem component to handle bookmark toggle without API calls
const MockJobItem = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div>
      <div data-testid="bookmark-icon" onClick={handleBookmarkToggle}>
        {isBookmarked ? <FaBookmark data-testid="bookmarked" /> : <FaRegBookmark data-testid="not-bookmarked" />}
      </div>
      <div>{job.title}</div>
    </div>
  );
};

describe('JobItem Bookmark Toggle with Mock Data', () => {
  const mockJob = {
    id: '657063e2144042c215319530',
    title: 'Updated Updated test',
    company: 'Africa to Silicon Valley',
    description: 'Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor...',
    categories: ['Education Access and Quality Improvement'],
    isBookmarked: false, // Initial state not bookmarked
    logoUrl: 'https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg',
    location: ['Adama', 'Addis Ababa'],
    opType: 'virtual',
  };

  it('adds a bookmark when the bookmark icon is clicked and the job is not bookmarked', () => {
    render(<MockJobItem job={mockJob} />);

    // Ensure the job is not bookmarked initially
    expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('bookmarked')).not.toBeInTheDocument();
    expect(screen.getByTestId('not-bookmarked')).toBeInTheDocument();

    // Click to add bookmark
    fireEvent.click(screen.getByTestId('bookmark-icon'));

    // Check if the bookmark status has changed to "bookmarked"
    expect(screen.queryByTestId('not-bookmarked')).not.toBeInTheDocument();
    expect(screen.getByTestId('bookmarked')).toBeInTheDocument();
  });

  it('removes a bookmark when the bookmark icon is clicked and the job is already bookmarked', () => {
    // Update mockJob to simulate it is bookmarked
    mockJob.isBookmarked = true;

    render(<MockJobItem job={mockJob} />);

    // Ensure the job is bookmarked initially
    expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('not-bookmarked')).not.toBeInTheDocument();
    expect(screen.getByTestId('bookmarked')).toBeInTheDocument();

    // Click to remove bookmark
    fireEvent.click(screen.getByTestId('bookmark-icon'));

    // Check if the bookmark status has changed to "not bookmarked"
    expect(screen.queryByTestId('bookmarked')).not.toBeInTheDocument();
    expect(screen.getByTestId('not-bookmarked')).toBeInTheDocument();
  });
});
