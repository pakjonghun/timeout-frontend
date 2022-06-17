import { useGetMyInfoQuery } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const usePublic = () => {
  const navigate = useNavigate();

  const { data, isFetching, isLoading, isSuccess } = useGetMyInfoQuery();

  useEffect(() => {
    if (!isFetching && isSuccess) {
      toast.warn('이미 로그인 중입니다.');
      navigate('/');
    }
  }, [isFetching, isSuccess, navigate]);

  return { isLoading, data };
};

export default usePublic;
