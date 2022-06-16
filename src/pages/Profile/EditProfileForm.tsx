import React from 'react';
import ConfirmButton from '@components/ConfirmButton';
import TextInput from '@components/TextInput';

const EditProfileForm = () => {
  return (
    <form className="mx-auto w-72 pt-10 space-y-4">
      <TextInput id="phone" />
      <TextInput id="email" />

      <div className="flex space-x-3 pt-5">
        <ConfirmButton title="save" />
        <ConfirmButton title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditProfileForm;
