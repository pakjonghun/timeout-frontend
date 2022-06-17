import { useAppSelector } from './useRedux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const usePublic = () => {
  const { isLoading, isLogin } = useAppSelector((state) => ({ ...state.user }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLogin) {
      toast.warn('이미 로그인 중입니다.');
      navigate('/');
    }
  }, [isLoading, navigate]);

  return { isLoading };
};

export default usePublic;
