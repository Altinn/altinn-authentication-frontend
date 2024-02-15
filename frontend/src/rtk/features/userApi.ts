import { api } from './api';
import { User } from '@/types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query<User, void>({
      query: () => `profile/user`,
    }),
  }),
});

export const { useGetLoggedInUserQuery } = userApi;
