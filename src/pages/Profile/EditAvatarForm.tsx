import React from 'react';
import TextInput from '@components/TextInput';
import ConfirmButton from '@components/ConfirmButton';

const EditAvatarForm = () => {
  return (
    <form className="mx-auto w-72 pt-10 space-y-4">
      <TextInput id="avatar" type="file" />

      <div className="flex space-x-3 pt-5">
        <ConfirmButton title="save" />
        <ConfirmButton title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditAvatarForm;
