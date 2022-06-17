import { me, joinForm, loginForm, joinResponse, loginResponse } from '@models/user';
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
    login: build.mutation<loginResponse, loginForm>({
      query(body) {
        return {
          url: 'users/login',
          method: 'POST',
          body,
        };
      },
    }),
    getMyInfo: build.query<me, void>({
      query: () => '/users/me',
    }),
  }),
});

export const { useGetMyInfoQuery, useLoginMutation, useJoinMutation } = userApi;
