import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
const usePrivate = () => {
  const navigate = useNavigate();

  const { isFetching, data, isLoading, isSuccess } = useGetMyInfoQuery();

  useEffect(() => {
    if (!isFetching && !isSuccess) {
      toast.warn('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isSuccess, isFetching, navigate]);
  return { isLoading, data };
};

export default usePrivate;
