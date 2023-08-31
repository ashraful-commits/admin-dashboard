import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const DashboardSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://admin-server-1.onrender.com/",
  }),
  tagTypes: ["users", "user"],
  endpoints: (builder) => ({}),
});

export default DashboardSlice;
