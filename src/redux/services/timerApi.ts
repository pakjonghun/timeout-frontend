import { startTimerRequest, startTimerResponse } from './../../models/timer';
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
    }),
  }),
});

export const { useStartTimerMutation } = recordApi;
