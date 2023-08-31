import DashboardSlice from "./DashboardSlice";

const UserSlice = DashboardSlice.injectEndpoints({
  endpoints: (builder) => ({
    AllUsers: builder.query({
      query: () => "api/v1/auth/",
    }),
    singleUser: builder.query({
      query: (id) => `api/v1/auth/${id}`,
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "api/v1/auth/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});
export const { useAllUsersQuery } = UserSlice;
export default UserSlice;
