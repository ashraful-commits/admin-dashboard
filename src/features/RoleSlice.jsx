import DashboardSlice from "./DashboardSlice";

const RoleSlice = DashboardSlice.enhanceEndpoints({
  addTagTypes: ["roles", "role"],
}).injectEndpoints({
  endpoints: (builder) => ({
    AllRoles: builder.query({
      query: () => "api/v1/role/",
      providesTags: ["roles"],
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
      providesTags: ["roles"],
      invalidatesTags: ["roles"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `api/v1/role/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["roles"],
      invalidatesTags: ["roles"],
    }),
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
export const {
  useAllRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useUpdateRoleStatusMutation,
} = RoleSlice;
export default RoleSlice;
