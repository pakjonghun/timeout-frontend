import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = retry(fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/api`, credentials: 'include' }), {
  maxRetries: 0,
});

const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  refetchOnFocus: true,
  tagTypes: ['MyInfo', 'Record', 'MyPrivate'],
});

export default api;
