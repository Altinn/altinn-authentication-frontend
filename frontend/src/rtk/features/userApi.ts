import { api } from './api';
import { ProfileInfo } from '@/types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<ProfileInfo, void>({
      query: () => `profile/user`,
    }),
  }),
});

export const { useGetLoggedInUserQuery } = userApi;
