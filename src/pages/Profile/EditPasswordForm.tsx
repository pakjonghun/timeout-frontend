import React, { useCallback, useEffect } from 'react';
import PinkSaveButton from '@components/ConfirmButton';
import TextInput from '@components/TextInput';
import { useForm } from 'react-hook-form';
import { editPasswordForm } from '@models/user';
import { useEditPasswordMutation } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import ErrorMessage from '@components/ErrorMessage';

interface props {
  closeAllInput: () => void;
}

const EditPasswordForm: React.FC<props> = ({ closeAllInput }) => {
  const [editPasswordMutation, { isLoading, isSuccess, isError }] = useEditPasswordMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('비밀번호 변경을 성공했습니다.');
      closeAllInput();
    }
    if (!isLoading && isError) {
      toast.error('비밀번호 변경이 실패했습니다.');
      closeAllInput();
    }
  }, [isError, isSuccess, isLoading, closeAllInput]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<editPasswordForm>({ mode: 'onChange' });

  const onValid = useCallback(
    (data: editPasswordForm) => {
      editPasswordMutation(data);
    },
    [editPasswordMutation],
  );

  return (
    <form onSubmit={handleSubmit(onValid)} className="mx-auto w-72 pt-10 space-y-4">
      <TextInput
        register={register('password', {
          required: '비밀번호를 입력하세요',
          maxLength: { value: 10, message: '비밀번호는 10자리 이하 입니다.' },
          minLength: { value: 2, message: '비밀번호는 2자리 이상 입니다.' },
          validate: {
            isSpace: (v: string) => !/[\s]/.test(v) || '공백은 포함할 수 없습니다.',
          },
        })}
        id="password"
      />
      <ErrorMessage errorMessage={errors.password?.message} />
      <TextInput
        register={register('passwordConfirm', {
          required: '비밀번호 확인을 입력하세요',
          maxLength: { value: 10, message: '비밀번호는 10자리 이하 입니다.' },
          minLength: { value: 2, message: '비밀번호는 2자리 이상 입니다.' },
          validate: {
            isSpace: (v: string) => !/[\s]/.test(v) || '공백은 포함할 수 없습니다.',
            isSameWithPassword: (v: string) => v === watch('password') || '비밀번호와 같아야 합니다.',
          },
        })}
        id="passwordConfirm"
      />
      <ErrorMessage errorMessage={errors.passwordConfirm?.message} />

      <div className="flex space-x-3 pt-5">
        <PinkSaveButton title="save" />
        <PinkSaveButton title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditPasswordForm;
