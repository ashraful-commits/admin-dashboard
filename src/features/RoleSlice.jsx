import DashboardSlice from "./DashboardSlice";

const RoleSlice = DashboardSlice.injectEndpoints({
  endpoints: (builder) => ({
    AllRoles: builder.query({
      query: () => "api/v1/role/",
    }),
    singleRole: builder.query({
      query: (id) => `api/v1/role/${id}`,
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: "api/v1/role/",
        method: "POST",
        body: data,
      }),
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `api/v1/role/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateRole: builder.mutation({
      query: (id) => ({
        url: `api/v1/role/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `api/v1/role/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});
export const { useAllRolesQuery, useCreateRoleMutation } = RoleSlice;
export default RoleSlice;
