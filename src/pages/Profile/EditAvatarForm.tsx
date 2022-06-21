import React, { useCallback, useEffect } from 'react';
import TextInput from '@components/TextInput';
import ConfirmButton from '@components/ConfirmButton';
import { useForm } from 'react-hook-form';
import { avatarForm } from '@models/user';
import { useAppDispatch } from '@hooks/useRedux';
import { setPreviewImage } from '@redux/features/user';
import { useUploadAvatarMutation } from '@redux/services/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@components/ErrorMessage';

interface props {
  closeAllInput: () => void;
}
const EditAvatarForm: React.FC<props> = ({ closeAllInput }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<avatarForm>({ mode: 'onChange' });

  const [uploadMutation, { isLoading, isSuccess, isError }] = useUploadAvatarMutation();

  const previewImage = watch('avatar');

  useEffect(() => {
    const afterAction = (isSuccess: boolean, isError: boolean) => {
      const message = isSuccess
        ? '업로드를 성공했습니다.'
        : isError
        ? '업로드를 실패했습니다.'
        : '알수없는 오류가 발생했습니다.';
      toast.success(message);
      dispatch(setPreviewImage(''));
      navigate('/profile');
      closeAllInput();
    };

    if (!isLoading && (isSuccess || isError)) {
      afterAction(isSuccess, isError);
    }
  }, [isLoading, isSuccess, isError, navigate, dispatch, closeAllInput]);

  useEffect(() => {
    if (previewImage?.length) {
      const imgPreview = URL.createObjectURL(previewImage[0]);
      dispatch(setPreviewImage(imgPreview));
    }
  }, [previewImage, dispatch]);

  const onValid = useCallback(
    (value: avatarForm) => {
      if (value.avatar && value.avatar.length) {
        try {
          const form = new FormData();
          form.append('avatar', value.avatar[0]);
          uploadMutation(form);
        } catch (err) {
          toast.error('업로드 도중 오류가 발생했습니다.');
        }
      }
    },
    [uploadMutation],
  );

  return (
    <form onSubmit={handleSubmit(onValid)} className="mx-auto w-72 pt-10 space-y-4">
      <TextInput
        attr={{ accept: 'image/*' }}
        register={register('avatar', {
          validate: {
            checkSize: (v: FileList) => {
              if (v[0].size >= 1024 * 1024 * 2) return '이미지 사이즈는 2mb 이하 입니다.';
              return true;
            },
          },
        })}
        id="avatar"
        type="file"
        classes="hover:border-pink-300"
      />
      <ErrorMessage errorMessage={errors?.avatar?.message} />

      <input accept="image/*" />
      <div className="flex space-x-3 pt-5">
        <ConfirmButton title="save" />
        <ConfirmButton title="cancel" role="cancel" />
      </div>
    </form>
  );
};

export default EditAvatarForm;
