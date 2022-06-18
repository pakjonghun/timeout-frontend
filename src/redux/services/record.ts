import { getRecordsResponse, getRecordsQuery } from './../../models/record';
import api from '.';
const recordApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecords: build.query<getRecordsResponse, getRecordsQuery>({
      query: ({ page, perPage }) => `/records?page=${page}&perPage=${perPage}`,
      providesTags: ['Record'],
    }),
  }),
});

export const { useGetRecordsQuery } = recordApi;
