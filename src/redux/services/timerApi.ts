import { endTimerRequest, startTimerRequest, startTimerResponse, endTimerResponse } from './../../models/timer';
import api from '.';

const recordApi = api.injectEndpoints({
  endpoints: (build) => ({
    startTimer: build.mutation<startTimerResponse, startTimerRequest>({
      query(body) {
        return {
          url: '/records',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MyInfo', 'Record'],
    }),
    endTimer: build.mutation<endTimerResponse, endTimerRequest>({
      query(body) {
        return {
          url: '/records/end',
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['MyInfo', 'Record'],
    }),
  }),
});

export const { useEndTimerMutation, useStartTimerMutation } = recordApi;
