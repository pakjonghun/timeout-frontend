import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/api`, credentials: 'include' }),
  endpoints: () => ({}),
  refetchOnFocus: true,
  tagTypes: ['MyInfo', 'Record', 'MyPrivate'],
});

export default api;
