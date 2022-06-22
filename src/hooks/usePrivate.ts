import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import socket from '../socket.io';

const usePrivate = () => {
  const navigate = useNavigate();

  const { isFetching, data, isLoading, isError, isSuccess } = useGetMyInfoQuery();

  useEffect(() => {
    console.log('/ isloading', isLoading);
    console.log('/ isFetching', isFetching);
    console.log('/ isError', isError);

    if (!isLoading && !isFetching && !isSuccess) {
      console.log('/  toast');
      toast.warn('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!isFetching && isSuccess) {
      socket.emit('reConnect', { id: data.data.id, role: data.data.role });
    }
  }, [isSuccess, isFetching, data, isFetching, isLoading, navigate]);
  return { isLoading, data };
};

export default usePrivate;
