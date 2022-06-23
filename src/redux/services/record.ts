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
      query: ({ page, perPage, sortValue, sortKey, endDate, searchTerm, startDate, isRefetch }) => {
        const URL = new URLSearchParams();
        URL.append('page', page + '');
        URL.append('perPage', perPage + '');
        URL.append('refetch', isRefetch + '');
        if (endDate) URL.append('endDate', endDate);
        if (startDate) URL.append('startDate', startDate);
        if (searchTerm) URL.append('searchTerm', searchTerm);
        if (sortValue && sortKey) {
          URL.append('sortKey', sortKey);
          URL.append('sortValue', sortValue);
        }
        return `records?${URL.toString()}`;
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
