import React, { useCallback, useEffect, useState } from 'react';
import TextInput from '@components/TextInput';
import AuthLayout from '@components/AuthLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ConfirmButton from '@components/ConfirmButton';
import { useForm } from 'react-hook-form';
import { loginForm } from '@models/user';
import ErrorMessage from '@components/ErrorMessage';
import { useLoginMutation } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import usePublic from '@hooks/usePublic';
import { useAppDispatch } from '@hooks/useRedux';
import socket from '../../socket.io';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const parsedState = state as { email: string | undefined; password: string | undefined };
  const navigate = useNavigate();
  const { isLoading: isMyInfoChecking } = usePublic(isLogin);
  const [loginMuataion, { isLoading, isError, error, isSuccess, data }] = useLoginMutation();

  useEffect(() => {
    if (!isLoading && isError && !isSuccess && !data) {
      //@ts-ignore
      if (error?.data?.message) {
        toast.error((error as { data: { message: string } }).data.message);
      } else {
        toast.error('로그인을 실패했습니다.');
      }
    }
  }, [error, isLoading, isError, isSuccess, data]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('로그인 성공 했습니다.');
      socket.emit('login', { id: data?.data.id, role: data?.data.role });

      navigate('/');
    }
  }, [dispatch, isLoading, isSuccess, data, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    mode: 'onChange',
    defaultValues: {
      email: parsedState?.email || '',
      password: parsedState?.password || '',
    },
  });

  const onValid = useCallback(
    (data: loginForm) => {
      loginMuataion(data);
      setIsLogin(true);
    },
    [loginMuataion],
  );

  if (isMyInfoChecking) return null;

  return (
    <AuthLayout
      classes="pt-[19%]"
      image="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/314752ff-dc41-4b33-19a7-9aea8e398700/origin"
    >
      <div className="grid grid-cols-2 px-5 py-3  bg-slate-100 mb-5 rounded-md shadow-md ">
        <div className="space-y-3">
          <h1 className="font-medium whitespace-nowrap">테스트 Manager 계정</h1>
          <div className="flex flex-col ">
            <small>ID : manager@email.com</small> <small>PW : 123</small>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="font-medium whitespace-nowrap">테스트 Client 계정</h1>
          <div className="flex flex-col ">
            <small>ID : client@email.com</small> <small>PW : 123</small>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onValid)} className="w-full space-y-8">
        <TextInput
          id="email"
          register={register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value: /^[a-zA-Z0-9]{1,20}\@[a-zA-Z0-9]{1,20}\.[a-zA-Z]{1,10}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
        />
        <ErrorMessage errorMessage={errors.email?.message} />
        <TextInput
          id="password"
          register={register('password', {
            required: '비밀번호를 입력하세요',
            maxLength: { value: 10, message: '비밀번호는 10자리 이하 입니다.' },
            minLength: { value: 2, message: '비밀번호는 2자리 이상 입니다.' },
            validate: {
              isSpace: (v: string) => {
                const test = /[\s]/.test(v);
                return test ? '공백은 포함할 수 없습니다.' : true;
              },
            },
          })}
        />
        <ErrorMessage errorMessage={errors.password?.message} />
        <div>
          <ConfirmButton type="submit" title="login" />
        </div>
        <div className="space-x-5 font-medium  text-sm">
          <span className="text-gray-800">계정이 없으세요?</span>
          <Link className="text-gray-400 hover:text-gray-800" to="/join">
            회원가입
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
