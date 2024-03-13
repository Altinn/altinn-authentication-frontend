import { api } from './api';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadJwk: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'systemuser/uploadjwk',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
});

export const { useUploadJwkMutation } = extendedApi;
