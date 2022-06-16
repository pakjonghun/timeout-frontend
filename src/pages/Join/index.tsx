import React from 'react';
import TextInput from '@components/TextInput';
import AuthLayout from '@components/AuthLayout';
import ConfirmButton from '@components/ConfirmButton';

const Join = () => {
  return (
    <AuthLayout
      classes="top-[5%]"
      image="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/45232f36-4aa6-4dba-dcfb-ec6af74a0200/origin"
    >
      <form className="w-full space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <TextInput id="firstName" />
          <TextInput id="lastName" />
        </div>
        <TextInput id="email" />
        <TextInput id="phoneNumber" />
        <TextInput id="password" />
        <TextInput id="passwordConfirm" />
        <div>
          <ConfirmButton title="join" />
        </div>
      </form>
    </AuthLayout>
  );
};

export default Join;
