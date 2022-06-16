import React from 'react';
import TextInput from '@components/TextInput';
import AuthLayout from '@components/AuthLayout';
import { Link } from 'react-router-dom';
import ConfirmButton from '@components/ConfirmButton';

const Login = () => {
  return (
    <AuthLayout
      classes="inset-y-0"
      image="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/945985a0-a262-42ad-4250-da716e3cdb00/origin"
    >
      <form className="w-full space-y-8">
        <TextInput id="email" />
        <TextInput id="password" />
        <div>
          <ConfirmButton title="login" />
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
