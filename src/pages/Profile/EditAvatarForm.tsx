import React from 'react';
import TextInput from '@components/TextInput';
import ConfirmButton from '@components/ConfirmButton';

interface props {
  closeAllInput: () => void;
}
const EditAvatarForm: React.FC<props> = ({ closeAllInput }) => {
  return (
    <form className="mx-auto w-72 pt-10 space-y-4">
      <TextInput id="avatar" type="file" classes="hover:border-pink-300" />

      <div className="flex space-x-3 pt-5">
        <ConfirmButton title="save" />
        <ConfirmButton title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditAvatarForm;
