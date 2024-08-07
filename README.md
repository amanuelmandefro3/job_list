# Job Listings Web Application

This is a web application for browsing job listings, implemented with Next.js and Tailwind CSS. Users can view all available job opportunities, sort them by relevance or deadline, and view detailed information about each job. Additionally, authentication has been added with NextAuth.js, providing signup, OTP, and login pages.

## Features

- Display all job listings
- Sort job listings by most relevant, nearest deadline, or farthest deadline
- View detailed information for each job
- User authentication with NextAuth.js
  - Signup page
  - OTP verification page
  - Login page

## Screenshots

### All Jobs Rendered

![All Jobs Rendered](./public/Image/Screenshot%20from%202024-08-03%2012-33-48.png)

### Sort Selection Dropdown

![Sort Selection Dropdown](./public/Image/Screenshot%20from%202024-08-03%2012-34-03.png)

### Job Details Page

![Job Details Page](./public/Image/Screenshot%20from%202024-08-03%2013-06-58.png)

### Signup Page

![Signup Page](./public/Image/Screenshot%20from%202024-08-07%2007-44-48.png)

### OTP Page

![OTP Page](./public/Image/Screenshot%20from%202024-08-07%2007-45-25.png)

### Login Page

![Login Page](./public/Image/Screenshot%20from%202024-08-07%2007-44-06.png)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/amanuelmandefro3/job_list.git
    ```
2. Navigate to the project directory:
    ```sh
    cd job-listings-webapp
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Code Structure

- `app/joblist/page.tsx`: The main page displaying the job listings and sorting functionality.
- `jobs.json`: The JSON file containing the job data.
- `public/images`: The directory containing job-related images.
- `pages/auth/signup.tsx`: The signup page for user registration.
- `pages/auth/otp.tsx`: The OTP verification page.
- `pages/auth/login.tsx`: The login page for user authentication.
