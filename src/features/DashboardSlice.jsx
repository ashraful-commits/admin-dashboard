import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API slice for interacting with a dashboard-related API.
const DashboardSlice = createApi({
  // Configure the base query settings for the API requests.
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/", // Base URL for API requests
    // baseUrl: "https://admin-server-inky.vercel.app/", // Base URL for API requests
    baseUrl: "https://admin-server-1.onrender.com/", // Alternate base URL
    credentials: "include", // Include credentials in requests
    withCredentials: true, // Enable cross-origin credentials
  }),

  // Define tag types for caching and invalidation purposes.
  tagTypes: ["users", "user"],

  // Define API endpoints for specific actions (to be added later).
  endpoints: (builder) => ({}),
});

export default DashboardSlice;
