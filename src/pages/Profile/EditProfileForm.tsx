import React, { useCallback, useEffect } from 'react';
import ConfirmButton from '@components/ConfirmButton';
import TextInput from '@components/TextInput';
import { editProfileForm } from '@models/user';
import { useForm } from 'react-hook-form';
import { useEditProfileMutation } from '@redux/services/userApi';
import ErrorMessage from '@components/ErrorMessage';
import { toast } from 'react-toastify';

interface props {
  closeAllInput: () => void;
  email?: string;
  phone?: number;
}

const EditProfileForm: React.FC<props> = ({ email, phone, closeAllInput }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editProfileForm>({
    mode: 'onChange',
    defaultValues: {
      email,
      phone,
    },
  });

  const [editProfileMutation, { isLoading, isSuccess, isError }] = useEditProfileMutation();

  const onValid = useCallback(
    (data: editProfileForm) => {
      editProfileMutation(data);
    },
    [editProfileMutation],
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('프로파일 업데이트를 성공했습니다.');
      closeAllInput();
    }
    if (!isLoading && isError) {
      toast.error('프로파일 변경을 실패했습니다.');
      closeAllInput();
    }
  }, [isSuccess, isLoading, isError, closeAllInput]);

  return (
    <form onSubmit={handleSubmit(onValid)} className="mx-auto w-72 pt-10 space-y-4">
      <TextInput
        register={register('phone', {
          required: '휴대폰 번호를 입력하세요',
          pattern: {
            value: /^[0-9]{11}$/,
            message: '휴대폰 번호는 11자리 숫자 입니다.',
          },
          validate: {
            isSpace: (v?: number) => {
              if (v == null) return true;
              return !/[\s]/.test(v + '') || '공백은 포함할 수 없습니다.';
            },
          },
        })}
        id="phone"
      />
      <ErrorMessage errorMessage={errors.phone?.message} />
      <TextInput
        register={register('email', {
          required: '이메일을 입력하세요',
          pattern: {
            value: /^[a-zA-Z0-9]{1,20}\@[a-zA-Z0-9]{1,20}\.[a-zA-Z]{1,10}$/,
            message: '이메일 형식이 올바르지 않습니다.',
          },
          validate: {
            isSpace: (v?: string) => {
              if (!v) return true;
              return !/[\s]/.test(v) || '공백은 포함할 수 없습니다.';
            },
          },
        })}
        id="email"
      />
      <ErrorMessage errorMessage={errors.email?.message} />

      <div className="flex space-x-3 pt-5">
        <ConfirmButton type="submit" title="save" />
        <ConfirmButton onClick={closeAllInput} type="button" title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditProfileForm;
