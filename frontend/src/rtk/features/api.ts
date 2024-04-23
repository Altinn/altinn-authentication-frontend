import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/resources/Cookie/CookieMethods';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'systemUserApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/authfront/api/v1/',
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json; charset=utf-8');
      headers.set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
      return headers;
    },
  }),
  endpoints: () => ({}),
});
