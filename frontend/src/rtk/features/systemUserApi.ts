import { normalizeUrl } from '@/utils/urlUtils';
import { api } from './api';
import { SystemRight, SystemUser, VendorSystem } from '@/types';

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

const apiWithTag = api.enhanceEndpoints({ addTagTypes: ['SystemUsers'] });

export const systemUserApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getSystemUsers: builder.query<SystemUser[], void>({
      query: () => `systemuser`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'SystemUsers', id })) : ['SystemUsers'],
    }),
    getSystemUser: builder.query<SystemUser, string>({
      query: (id) => `systemuser/${normalizeUrl`${id}`}`,
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
        url: `systemuser/${normalizeUrl`${systemUser.id}`}`,
        method: 'PUT',
        body: systemUser,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'SystemUsers', id: arg.id }],
    }),
    deleteSystemuser: builder.mutation<void, string>({
      query: (id) => ({
        url: `systemuser/${normalizeUrl`${id}`}`,
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
} = systemUserApi;
