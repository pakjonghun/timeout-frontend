import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import socket from '../socket.io';

const usePrivate = (isLogout?: boolean) => {
  const navigate = useNavigate();

  const { isFetching, data, isLoading, isError, isSuccess, error } = useGetMyInfoQuery();

  const errorCount = useRef<number>(0);
  useEffect(() => {
    if (!isFetching && !isSuccess) {
      if (isLogout) return;
      if (errorCount.current) return;
      errorCount.current++;
      //@ts-ignore
      if (error?.status == 'PARSING_ERROR' || error?.status == 'FETCH_ERROR') {
        toast.error('서버 연결이 원활하지 않습니다.');
        navigate('/login');
        return;
      }

      toast.warn('로그인이 필요합니다.');
      navigate('/login');
    }

    if (!isFetching && isSuccess) {
      socket.emit('reConnect', { id: data.data.id, role: data.data.role });
    }
  }, [isSuccess, isLogout, isError, data, isFetching, error, isLoading, navigate]);
  return { isLoading, data, isFetching, isSuccess, error, isError };
};

export default usePrivate;
