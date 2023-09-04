import DashboardSlice from "./DashboardSlice";

// Enhance the existing DashboardSlice to add specific tag types for roles.
const RoleSlice = DashboardSlice.enhanceEndpoints({
  addTagTypes: ["roles", "role"],
}).injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all roles
    AllRoles: builder.query({
      query: () => "api/v1/role/",
      providesTags: ["roles"],
    }),

    // Query to fetch a single role by ID
    singleRole: builder.query({
      query: (id) => `api/v1/role/${id}`,
    }),

    // Mutation to create a new role
    createRole: builder.mutation({
      query: (data) => ({
        url: "api/v1/role/",
        method: "POST",
        body: data,
      }),
      providesTags: ["roles"],
      invalidatesTags: ["roles"],
    }),

    // Mutation to delete a role by ID
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `api/v1/role/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["roles"],
      invalidatesTags: ["roles"],
    }),

    // Mutation to update a role by ID
    updateRole: builder.mutation({
      query: ({ Id, input }) => ({
        url: `api/v1/role/${Id}`,
        method: "PUT",
        credentials: "include",
        body: input,
      }),
      providesTags: ["roles"],
      invalidatesTags: ["roles"],
    }),

    // Mutation to update the status of a role by ID
    updateRoleStatus: builder.mutation({
      query: ({ id, input }) => ({
        url: `api/v1/role/${id}`,
        method: "PATCH",
        credentials: "include",
        body: input,
      }),
      providesTags: "roles",
      invalidatesTags: ["roles"],
    }),
  }),
});

// Export generated hooks and the enhanced RoleSlice
export const {
  useAllRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useUpdateRoleStatusMutation,
} = RoleSlice;

export default RoleSlice;
