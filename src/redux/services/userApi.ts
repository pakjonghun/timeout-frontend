import { me, joinForm, loginForm, joinResponse, userResponse } from '@models/user';
import api from '.';

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    join: build.mutation<joinResponse, joinForm>({
      query(body) {
        return {
          url: 'users',
          method: 'POST',
          body,
        };
      },
    }),
    login: build.mutation<userResponse, loginForm>({
      query(body) {
        return {
          url: 'users/login',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MyInfo'],
    }),
    getMyInfo: build.query<me, void>({
      query: () => '/users/me',
      providesTags: ['MyInfo'],
    }),

    logout: build.mutation<userResponse, void>({
      query() {
        return {
          url: 'users/logout',
          method: 'POST',
        };
      },
      invalidatesTags: ['MyInfo'],
    }),
  }),
});

export const { useGetMyInfoQuery, useLoginMutation, useLogoutMutation, useJoinMutation } = userApi;
