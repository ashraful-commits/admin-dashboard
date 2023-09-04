import DashboardSlice from "./DashboardSlice";

// Enhance the existing DashboardSlice to add specific tag types.
const PermissionsSlice = DashboardSlice.enhanceEndpoints({
  addTagTypes: ["permissions", "permission"],
}).injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all permissions
    Allpermissionss: builder.query({
      query: () => "api/v1/permissions/",
      providesTags: ["permissions"],
    }),

    // Query to fetch a single permission by ID
    singlepermission: builder.query({
      query: (id) => `api/v1/permissions/${id}`,
      providesTags: ["permission"],
    }),

    // Mutation to create a new permission
    createpermission: builder.mutation({
      query: (data) => ({
        url: "api/v1/permissions/",
        method: "POST",
        body: data,
      }),
      providesTags: ["permissions"],
      invalidatesTags: ["permissions"],
    }),

    // Mutation to delete a permission by ID
    deletepermission: builder.mutation({
      query: (id) => ({
        url: `api/v1/permissions/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["permissions"],
      invalidatesTags: ["permissions"],
    }),

    // Mutation to update a permission by ID
    updatepermission: builder.mutation({
      query: ({ Id, input }) => ({
        url: `api/v1/permissions/${Id}`,
        method: "PUT",
        credentials: "include",
        body: input,
      }),
      providesTags: ["permission"],
      invalidatesTags: ["permissions"],
    }),

    // Mutation to update the status of a permission by ID
    updatePermissionStatus: builder.mutation({
      query: ({ id, input }) => ({
        url: `api/v1/permissions/${id}`,
        method: "PATCH",
        credentials: "include",
        body: input,
      }),
      providesTags: ["permissions"],
      invalidatesTags: ["permissions"],
    }),
  }),
});

// Export generated hooks and the enhanced PermissionsSlice
export const {
  useAllpermissionssQuery,
  useCreatepermissionMutation,
  useUpdatepermissionMutation,
  useUpdatePermissionStatusMutation,
  useDeletepermissionMutation,
} = PermissionsSlice;

export default PermissionsSlice;
