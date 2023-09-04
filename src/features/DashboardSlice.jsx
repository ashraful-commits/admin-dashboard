import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const DashboardSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
    withCredentials: true,
  }),

  tagTypes: ["users", "user"],

  endpoints: (builder) => ({}),
});

export default DashboardSlice;
