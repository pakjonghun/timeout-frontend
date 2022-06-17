import { getMyInfoFetch } from './../redux/features/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
const usePrivate = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading, isLogin } = useAppSelector((state) => ({ ...state.user }));

  useEffect(() => {
    dispatch(getMyInfoFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isLogin) {
      console.log('you you');
      toast.warn('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isLoading, navigate]);

  return { isLoading };
};

export default usePrivate;
