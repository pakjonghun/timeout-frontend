import { setIsLogin } from '@redux/features/user';
import { useAppSelector, useAppDispatch } from './useRedux';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const usePublic = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const isLogin = useAppSelector((state) => state.user.isLogin);
  const { isFetching, data, isLoading, isSuccess, isError, error } = useGetMyInfoQuery();

  console.log('login isLoading', isLoading);
  console.log('login isFetching', isFetching);
  console.log('login success', isSuccess);
  console.log('login error', error);
  console.log('login isError', isError);
  console.log('login data', data);

  console.log('gogo log In!', !isFetching && isSuccess);
  useEffect(() => {
    if (!isFetching && isSuccess) {
      console.log('plz');
      if (isError && data) return;
      toast.warn('이미 로그인 중입니다.');
      navigate('/');
    }
  }, [data, isLoading, isSuccess, isError, error, navigate]);

  return { isLoading };
};

export default usePublic;
