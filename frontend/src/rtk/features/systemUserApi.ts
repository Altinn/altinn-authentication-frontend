import { url } from '@/utils/urlUtils';
import { api } from './api';
import {
  ChangeRequest,
  ServiceResource,
  SystemUser,
  SystemUserCreationRequest,
  VendorSystem,
} from '@/types';

enum Tags {
  SystemUsers = 'Systemusers',
  VendorSystems = 'VendorSystems',
}

interface CreationRequest {
  integrationTitle: string;
  selectedSystemType: string;
}

const apiWithTag = api.enhanceEndpoints({ addTagTypes: [Tags.SystemUsers, Tags.VendorSystems] });

export const systemUserApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getSystemUsers: builder.query<SystemUser[], void>({
      query: () => `systemuser`,
      providesTags: [Tags.SystemUsers],
    }),
    getSystemUser: builder.query<SystemUser, string>({
      query: (id) => url`systemuser/${id}`,
    }),
    getVendors: builder.query<VendorSystem[], void>({
      query: () => `/systemregister`,
      providesTags: [Tags.VendorSystems],
      keepUnusedDataFor: Infinity,
    }),
    getSystemRights: builder.query<ServiceResource[], string>({
      query: (systemId) => url`systemregister/rights/${systemId}`,
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
      query: (requestId) => url`systemuser/request/${requestId}`,
    }),
    approveSystemUserRequest: builder.mutation<void, string>({
      query: (creationRequestId) => ({
        url: url`systemuser/request/${creationRequestId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
    rejectSystemUserRequest: builder.mutation<void, string>({
      query: (creationRequestId) => ({
        url: url`systemuser/request/${creationRequestId}/reject`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
    getChangeRequest: builder.query<ChangeRequest, string>({
      query: (changeRequestId) => url`systemuser/changerequest/${changeRequestId}`,
    }),
    approveChangeRequest: builder.mutation<void, string>({
      query: (changeRequestId) => ({
        url: url`systemuser/changerequest/${changeRequestId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SystemUsers],
    }),
    rejectChangeRequest: builder.mutation<void, string>({
      query: (changeRequestId) => ({
        url: url`systemuser/changerequest/${changeRequestId}/reject`,
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
  useGetSystemRightsQuery,
  useGetSystemUserRequestQuery,
  useApproveSystemUserRequestMutation,
  useRejectSystemUserRequestMutation,
  useGetChangeRequestQuery,
  useApproveChangeRequestMutation,
  useRejectChangeRequestMutation,
} = systemUserApi;
