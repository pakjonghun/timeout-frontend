import React from 'react';
import PinkSaveButton from '@components/ConfirmButton';
import TextInput from '@components/TextInput';

const EditPasswordForm = () => {
  return (
    <form className="mx-auto w-72 pt-10 space-y-4">
      <TextInput id="password" />
      <TextInput id="passwordConfirm" />

      <div className="flex space-x-3 pt-5">
        <PinkSaveButton title="save" />
        <PinkSaveButton title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditPasswordForm;
