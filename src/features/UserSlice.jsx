import DashboardSlice from "./DashboardSlice";

// Create a UserSlice using DashboardSlice.injectEndpoints
const UserSlice = DashboardSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all users
    AllUsers: builder.query({
      query: () => "api/v1/auth/",
      providesTags: ["users"], // Tags for caching
    }),

    // Query to fetch user data for the authenticated user
    me: builder.query({
      query: () => "api/v1/auth/me",
      providesTags: ["users"],
      invalidatesTags: ["users"], // Tags for caching
    }),

    // Mutation to create a new user
    createUser: builder.mutation({
      query: (data) => ({
        url: "api/v1/auth/",
        method: "POST",
        body: data,
      }),
      providesTags: ["users"], // Tags for cache invalidation
      invalidatesTags: ["users"], // Tags to invalidate when a new user is created
    }),

    // Mutation to log in a user
    loginUser: builder.mutation({
      query: (data) => ({
        url: "api/v1/auth/login/",
        method: "POST",
        body: data,
      }),
      providesTags: ["users"], // Tags for cache invalidation
      invalidatesTags: ["users"], // Tags to invalidate when a user logs in
    }),

    // Mutation to delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/${id}`,
        method: "DELETE",
      }),
      providesTags: ["users"], // Tags for cache invalidation
      invalidatesTags: ["users"], // Tags to invalidate when a user is deleted
    }),

    // Mutation to update a user's data
    updateUser: builder.mutation({
      query: ({ Id, input }) => ({
        url: `api/v1/auth/${Id}`,
        method: "PUT",
        body: input,
      }),
      providesTags: ["users"], // Tags for cache invalidation
      invalidatesTags: ["users"], // Tags to invalidate when a user's data is updated
    }),

    // Mutation to update a user's status
    updateStatus: builder.mutation({
      query: ({ id, input }) => ({
        url: `api/v1/auth/${id}`,
        method: "PATCH",

        body: input,
      }),
      providesTags: ["users"], // Tags for cache invalidation
      invalidatesTags: ["users"], // Tags to invalidate when a user's status is updated
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `api/v1/auth/logout/`,
        method: "POST",
      }),
      providesTags: ["users"],
      invalidatesTags: ["users"],
    }),
    userProfile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/v1/auth/photo/${id}`,
        method: "POST",
        body: formData,
      }),
      providesTags: ["users"],
      invalidatesTags: ["users"],
    }),
  }),
});

// Export the hooks for using these endpoints in your components
export const {
  useAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateStatusMutation,
  useLoginUserMutation,
  useMeQuery,
  useUserLogoutMutation,
  useUserProfileMutation,
} = UserSlice;

// Export the UserSlice for setting up Redux store
export default UserSlice;
