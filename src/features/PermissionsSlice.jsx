import DashboardSlice from "./DashboardSlice";

const PermissionsSlice = DashboardSlice.injectEndpoints({
  endpoints: (builder) => ({
    Allpermissionss: builder.query({
      query: () => "api/v1/permissions/",
    }),
    singlepermission: builder.query({
      query: (id) => `api/v1/permissions/${id}`,
    }),
    createpermission: builder.mutation({
      query: (data) => ({
        url: "api/v1/permissions/",
        method: "POST",
        body: data,
      }),
    }),
    deletepermission: builder.mutation({
      query: (id) => ({
        url: `api/v1/permissions/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updatepermission: builder.mutation({
      query: (id) => ({
        url: `api/v1/permissions/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    updatePermissionStatus: builder.mutation({
      query: (id) => ({
        url: `api/v1/permissions/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});
export const { useAllpermissionssQuery, useCreatepermissionMutation } =
  PermissionsSlice;
export default PermissionsSlice;
