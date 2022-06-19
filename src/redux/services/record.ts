import { getRecordsResponse, getRecordsQuery } from './../../models/record';
import api from '.';
const recordApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecords: build.query<getRecordsResponse, getRecordsQuery>({
      query: ({ page, perPage, sortValue, sortKey }) => {
        if (sortValue == null || sortKey == null) {
          return `/records?page=${page}&perPage=${perPage}`;
        }

        return `/records?page=${page}&perPage=${perPage}&sortValue=${sortValue}&sortKey=${sortKey}`;
      },

      providesTags: ['Record'],
    }),
  }),
});

export const { useGetRecordsQuery } = recordApi;
