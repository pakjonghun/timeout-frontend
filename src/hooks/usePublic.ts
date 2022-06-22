import { useEffect, useRef } from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const usePublic = (isLogin?: boolean) => {
  const navigate = useNavigate();

  const { data, isFetching, isLoading, isSuccess, error } = useGetMyInfoQuery();

  const errorCount = useRef<number>(0);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      if (isLogin) return;
      if (errorCount.current) return;

      errorCount.current++;
      //@ts-ignore
      if (error?.status == 'PARSING_ERROR' || error?.status == 'FETCH_ERROR') {
        toast.error('서버 연결이 원활하지 않습니다.');
        return;
      }

      toast.warn('이미 로그인 중입니다.');
      navigate('/');
    }
  }, [isLoading, isFetching, isLogin, error, isSuccess, navigate]);

  return { isLoading, data };
};

export default usePublic;
