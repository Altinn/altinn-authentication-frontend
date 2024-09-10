import { url } from '@/utils/urlUtils';
import { api } from './api';
import { SystemUser, SystemUserCreationRequest, VendorSystem } from '@/types';

enum Tags {
  SystemUsers = 'Systemusers',
}

interface CreationRequest {
  integrationTitle: string;
  selectedSystemType: string;
}

const apiWithTag = api.enhanceEndpoints({ addTagTypes: [Tags.SystemUsers] });

export const systemUserApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getSystemUsers: builder.query<SystemUser[], void>({
      query: () => `systemuser`,
      providesTags: [Tags.SystemUsers],
    }),
    getSystemUser: builder.query<SystemUser, string>({
      query: (id) => url`systemuser/${id}`,
      providesTags: [Tags.SystemUsers],
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
      invalidatesTags: [Tags.SystemUsers],
    }),
    updateSystemuser: builder.mutation<SystemUser, SystemUser>({
      query: (systemUser) => ({
        url: url`systemuser/${systemUser.id}`,
        method: 'PUT',
        body: systemUser,
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
    deleteSystemuser: builder.mutation<void, string>({
      query: (id) => ({
        url: url`systemuser/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
    getSystemUserRequest: builder.query<SystemUserCreationRequest, string>({
      query: (requestId) => url`systemuser/requests/${requestId}`,
    }),
    approveSystemUserRequest: builder.mutation<void, string>({
      query: (creationRequestId) => ({
        url: url`systemuser/requests/${creationRequestId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
    rejectSystemUserRequest: builder.mutation<void, string>({
      query: (creationRequestId) => ({
        url: url`systemuser/requests/${creationRequestId}/reject`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
  }),
});

export const {
  useCreateSystemUserMutation,
  useDeleteSystemuserMutation,
  useGetSystemUserQuery,
  useGetSystemUsersQuery,
  useUpdateSystemuserMutation,
  useGetVendorsQuery,
  useGetSystemUserRequestQuery,
  useApproveSystemUserRequestMutation,
  useRejectSystemUserRequestMutation,
} = systemUserApi;
