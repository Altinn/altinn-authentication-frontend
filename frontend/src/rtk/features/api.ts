import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'systemUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/authfront/api/v1/' }),
  endpoints: () => ({}),
});
