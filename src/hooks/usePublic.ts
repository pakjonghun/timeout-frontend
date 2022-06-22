import { useEffect } from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const usePublic = () => {
  const navigate = useNavigate();

  const { data, isFetching, isLoading, isSuccess } = useGetMyInfoQuery();

  useEffect(() => {
    console.log('/login isloading', isLoading);
    console.log('/login isFetching', isFetching);
    console.log('/login isSuccess', isSuccess);

    if (!!isLoading && !isFetching && isSuccess) {
      console.log('/login toast');
      toast.warn('이미 로그인 중입니다.');
      navigate('/');
      return;
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  return { isLoading, data };
};

export default usePublic;
