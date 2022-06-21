import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@components/TextInput';
import AuthLayout from '@components/AuthLayout';
import ConfirmButton from '@components/ConfirmButton';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@components/ErrorMessage';
import { joinForm } from '@models/user';
import { useJoinMutation } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import usePublic from '@hooks/usePublic';

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<joinForm>({ mode: 'onChange' });

  const navigate = useNavigate();

  const { isLoading: isMyInfoChecking } = usePublic();

  const [joinMutation, { isSuccess, error }] = useJoinMutation();

  const onValid = useCallback(
    (data: joinForm) => {
      joinMutation(data);
    },
    [joinMutation],
  );

  useEffect(() => {
    if (error) toast.error((error as { error: string }).error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('회원가입이 성공했습니다.');
      navigate('/login', { state: { email: watch('email'), password: watch('password') } });
    }
  }, [isSuccess, navigate, watch]);

  if (isMyInfoChecking) return null;

  return (
    <AuthLayout
      classes="top-[5%]"
      image="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/45232f36-4aa6-4dba-dcfb-ec6af74a0200/origin"
    >
      <form onSubmit={handleSubmit(onValid)} className="w-full space-y-4">
        <TextInput
          id="name"
          register={register('name', {
            required: '이름을 입력하세요',
            pattern: {
              value: /[가-힣a-zA-Z]{2,10}/,
              message: '이름은 2~10자리 문자열 입니다.',
            },
          })}
        />
        <ErrorMessage errorMessage={errors.name?.message} />

        <TextInput
          id="email"
          register={register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value: /^[a-zA-Z0-9]{1,20}\@[a-zA-Z0-9]{1,20}\.[a-zA-Z]{1,10}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
            validate: {
              isSpace: (v: string) => !/[\s]/.test(v) || '공백은 포함할 수 없습니다.',
            },
          })}
        />
        <ErrorMessage errorMessage={errors.email?.message} />
        <TextInput
          id="phoneNumber"
          register={register('phone', {
            required: '휴대폰 번호를 입력하세요',
            pattern: {
              value: /^[0-9]{11}$/,
              message: '휴대폰 번호는 11자리 숫자 입니다.',
            },
            validate: {
              isSpace: (v: number) => !/[\s]/.test(v + '') || '공백은 포함할 수 없습니다.',
            },
          })}
        />
        <ErrorMessage errorMessage={errors.phone?.message} />
        <TextInput
          id="password"
          register={register('password', {
            required: '비밀번호를 입력하세요',
            maxLength: { value: 10, message: '비밀번호는 10자리 이하 입니다.' },
            minLength: { value: 2, message: '비밀번호는 2자리 이상 입니다.' },
            validate: {
              isSpace: (v: string) => !/[\s]/.test(v) || '공백은 포함할 수 없습니다.',
            },
          })}
        />
        <ErrorMessage errorMessage={errors.password?.message} />
        <TextInput
          id="passwordConfirm"
          register={register('passwordConfirm', {
            required: '비밀번호 확인을 입력하세요',
            maxLength: { value: 10, message: '비밀번호는 10자리 이하 입니다.' },
            minLength: { value: 2, message: '비밀번호는 2자리 이상 입니다.' },
            validate: {
              isSpace: (v: string) => !/[\s]/.test(v) || '공백은 포함할 수 없습니다.',
              isSameWithPassword: (v: string) => v === watch('password') || '비밀번호와 같아야 합니다.',
            },
          })}
        />
        <ErrorMessage errorMessage={errors.passwordConfirm?.message} />
        <div className="space-y-2">
          <ConfirmButton title="join" />
          <div className="space-x-3">
            <span className="font-medium text-sm text-gray-500">계정이 있으신가요?</span>
            <Link className="font-medium text-sm text-gray-500 hover:text-gray-800" to="/login">
              Login 하러 가기
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Join;
