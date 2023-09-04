import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const DashboardSlice = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/",
    baseUrl: "https://admin-server-1.onrender.com/",
    credentials: "include",
    withCredentials: true,
  }),

  tagTypes: ["users", "user"],

  endpoints: (builder) => ({}),
});

export default DashboardSlice;
