import DashboardSlice from "./DashboardSlice";

const PermissionsSlice = DashboardSlice.enhanceEndpoints({
  addTagTypes: ["permissions", "permission"],
}).injectEndpoints({
  endpoints: (builder) => ({
    Allpermissionss: builder.query({
      query: () => "api/v1/permissions/",
      providesTags: ["permissions"],
    }),
    singlepermission: builder.query({
      query: (id) => `api/v1/permissions/${id}`,
      providesTags: ["permission"],
    }),
    createpermission: builder.mutation({
      query: (data) => ({
        url: "api/v1/permissions/",
        method: "POST",
        body: data,
      }),
      providesTags: ["permissions"],
      invalidatesTags: ["permissions"],
    }),
    deletepermission: builder.mutation({
      query: (id) => ({
        url: `api/v1/permissions/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["permissions"],
      invalidatesTags: ["permissions"],
    }),
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
export const {
  useAllpermissionssQuery,
  useCreatepermissionMutation,
  useUpdatepermissionMutation,
  useUpdatePermissionStatusMutation,
  useDeletepermissionMutation,
} = PermissionsSlice;
export default PermissionsSlice;
