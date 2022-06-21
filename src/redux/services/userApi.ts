import {
  editProfileResponst,
  editProfileRequest,
  editPasswordRequest,
  editPasswordResponse,
  privateInfo,
  avatarResponse,
} from './../../models/user';
import { me, joinForm, loginForm, joinResponse, userResponse } from '@models/user';
import api from '.';

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    join: build.mutation<joinResponse, joinForm>({
      query(body) {
        return {
          url: '/users',
          method: 'POST',
          body,
        };
      },
    }),
    login: build.mutation<userResponse, loginForm>({
      query(body) {
        return {
          url: '/users/login',
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
    getMyPrivate: build.query<privateInfo, void>({
      query: () => '/users/private',
      providesTags: ['MyPrivate'],
    }),

    logout: build.mutation<userResponse, void>({
      query() {
        return {
          url: '/users/logout',
          method: 'POST',
        };
      },
      invalidatesTags: ['MyInfo', 'Record'],
    }),
    editProfile: build.mutation<editProfileResponst, editProfileRequest>({
      query(body) {
        return {
          url: '/users',
          method: 'PATCH',
          body,
        };
      },
    }),
    editPassword: build.mutation<editPasswordResponse, editPasswordRequest>({
      query(body) {
        return {
          url: '/users/password',
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['MyInfo'],
    }),
    uploadAvatar: build.mutation<avatarResponse, FormData>({
      query(body) {
        return {
          url: '/users/avatar',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MyInfo'],
    }),
  }),
});

export const {
  useUploadAvatarMutation,
  useGetMyPrivateQuery,
  useEditProfileMutation,
  useEditPasswordMutation,
  useGetMyInfoQuery,
  useLoginMutation,
  useLogoutMutation,
  useJoinMutation,
} = userApi;
