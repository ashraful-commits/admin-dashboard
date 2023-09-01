import DashboardSlice from "./DashboardSlice";

const UserSlice = DashboardSlice.injectEndpoints({
  endpoints: (builder) => ({
    AllUsers: builder.query({
      query: () => "api/v1/auth/",
      providesTags: ["users"],
    }),
    singleUser: builder.query({
      query: (id) => `api/v1/auth/${id}`,
      providesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "api/v1/auth/",
        method: "POST",
        body: data,
      }),
      providesTags: ["users"],
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["users"],
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      providesTags: ["users"],
      invalidatesTags: ["users"],
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      providesTags: ["users"],
      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateStatusMutation,
  useSingleUserQuery,
} = UserSlice;
export default UserSlice;
