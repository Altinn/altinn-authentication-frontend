import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SystemRight, SystemUser, User, VendorSystem } from '@/types';

const mockRightsActionsArray = [
  { name: 'Lese', on: true },
  { name: 'Skrive', on: false },
  { name: 'Signere', on: true },
  { name: 'Les arkiv', on: false },
  { name: 'Launch-Rune´s-Rocket', on: true },
];

interface CreationRequest {
  integrationTitle: string;
  selectedSystemType: string;
}

// Define a service using a base URL and expected endpoints
export const systemUserApi = createApi({
  reducerPath: 'systemUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/authfront/api/v1/' }),
  tagTypes: ['SystemUsers'],
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<User, void>({
      query: () => `profile/user`,
    }),
    getSystemUsers: builder.query<SystemUser[], void>({
      query: () => `systemuser`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'SystemUsers', id })) : ['SystemUsers'],
    }),
    getSystemUser: builder.query<SystemUser, string>({
      query: (id) => `systemuser/${id}`,
      providesTags: (result) => (result ? [{ type: 'SystemUsers', id: result.id }] : []),
    }),
    getRights: builder.query<SystemRight[], void>({
      query: () => `/systemregister/product/1`,
      transformResponse: (rights: SystemRight[]) => {
        return rights.map((x) => {
          return {
            ...x,
            actions: [...mockRightsActionsArray],
          };
        });
      },
    }),
    getVendors: builder.query<VendorSystem[], void>({
      query: () => `/systemregister`,
    }),
    createSystemUser: builder.mutation<SystemUser, CreationRequest>({
      query: (systemUser) => ({
        url: 'systemuser',
        method: 'POST',
        body: systemUser,
      }),
      invalidatesTags: ['SystemUsers'],
    }),
    updateSystemuser: builder.mutation<SystemUser, SystemUser>({
      query: (systemUser) => ({
        url: `systemuser/${systemUser.id}`,
        method: 'PUT',
        body: systemUser,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'SystemUsers', id: arg.id }],
    }),
    deleteSystemuser: builder.mutation<void, string>({
      query: (id) => ({
        url: `systemuser/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SystemUsers'],
    }),
  }),
});

export const {
  useCreateSystemUserMutation,
  useDeleteSystemuserMutation,
  useGetSystemUserQuery,
  useGetSystemUsersQuery,
  useUpdateSystemuserMutation,
  useGetRightsQuery,
  useGetVendorsQuery,
  useGetLoggedInUserQuery,
} = systemUserApi;
