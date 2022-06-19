import {
  getRecordsResponse,
  getRecordsQuery,
  adminEditRecordResponse,
  adminEditRecordRequest,
  adminDeleteRecordResponse,
  adminDeleteRecordRequest,
  adminDeleteRecordsRequest,
} from './../../models/record';
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
    editRecord: build.mutation<adminEditRecordResponse, adminEditRecordRequest>({
      query: ({ id, ...body }) => {
        return {
          url: `/records/admin/edit/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Record', 'MyInfo'],
    }),
    deleteRecord: build.mutation<adminDeleteRecordResponse, adminDeleteRecordRequest>({
      query: ({ id }) => {
        return {
          url: `/records/admin/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Record', 'MyInfo'],
    }),
    deleteManyRecords: build.mutation<adminDeleteRecordResponse, adminDeleteRecordsRequest>({
      query: ({ ids }) => {
        return {
          url: `/records/admin/delete?ids=${ids}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Record', 'MyInfo'],
    }),
  }),
});

export const { useDeleteManyRecordsMutation, useDeleteRecordMutation, useEditRecordMutation, useGetRecordsQuery } =
  recordApi;
