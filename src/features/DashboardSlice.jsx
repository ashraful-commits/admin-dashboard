import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const DashboardSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://admin-server-1.onrender.com/",
    credentials: "include",
    withCredentials: true,
  }),

  tagTypes: ["users", "user"],

  endpoints: (builder) => ({}),
});

export default DashboardSlice;
