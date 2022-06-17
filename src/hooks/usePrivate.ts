import { setIsLogin } from '@redux/features/user';
import { getMyInfoFetch } from './../redux/features/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { useGetMyInfoQuery } from '@redux/services/userApi';
const usePrivate = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const isLogin = useAppSelector((state) => state.user.isLogin);

  const { isFetching, data, isLoading, isError, error, isSuccess } = useGetMyInfoQuery();
  console.log('timer isLoading', isLoading);
  console.log('timer isFetching', isFetching);
  console.log('timer success', isSuccess);
  console.log('timer error', error);
  console.log('timer isError', isError);
  console.log('timer data', data);
  // useEffect(() => {
  //   if (!isLoading && data && !isError && isSuccess && !error) dispatch(setIsLogin(true));
  //   if (!isLoading && !data && error && !isSuccess && isError) dispatch(setIsLogin(false));
  // }, [isLoading, data, dispatch, isError, error, isSuccess]);
  console.log('gogo lotout!', !isFetching && !isSuccess);
  useEffect(() => {
    if (!isFetching && !isSuccess) {
      console.log('plz');
      toast.warn('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isLoading, isSuccess, error, isError, data, navigate]);
  return { isLoading, data };
};

export default usePrivate;
