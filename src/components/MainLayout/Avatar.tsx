import React from 'react';
import gravatar from 'gravatar';
import { joinStyle } from '@utils/styleUtils';
import { useAppSelector } from '@hooks/useRedux';
import Spinner from '@components/Spinner';

interface props {
  src?: string | null;
  src2?: string | null;
  size?: 'small' | 'large';
  callBack?: () => void;
  isLoading: boolean;
}

const Avatar: React.FC<props> = ({ src2, src, size = 'small', callBack, isLoading }) => {
  const preview = useAppSelector((state) => state.user.previewImage);
  const smallSizeStyle =
    size === 'small' ? 'h-10 w-10 transition-all hover:scale-105 active:scale-100 duration-75' : '';
  const largeSizeStyle = size === 'large' ? 'h-28 w-28' : '';
  const smallGravatar = size === 'small' ? '40px' : '';
  const largeGravatar = size === 'large' ? '80px' : '';

  if (isLoading) {
    <div
      className={joinStyle(smallSizeStyle, largeSizeStyle, 'flex items-center justify-center rounded-full shadow-md')}
    >
      <Spinner classes="h-5 w-5" />
    </div>;
  }

  if (preview.trim()) {
    return (
      <img
        {...(callBack && { onClick: callBack })}
        className={joinStyle(smallSizeStyle, largeSizeStyle, 'h-10 aspect-square rounded-full')}
        src={preview}
        alt="avatar"
      />
    );
  }

  if (src && src2)
    return (
      <img
        className={joinStyle(smallSizeStyle, largeSizeStyle, 'h-10 aspect-square rounded-full')}
        src={src}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = src2;
        }}
        alt="avatar"
      />
    );

  return (
    <img
      className={joinStyle(largeSizeStyle, smallSizeStyle, 'rounded-full w-10 h-10 shadow-md')}
      src={gravatar.url('avatar', { s: joinStyle(smallGravatar, largeGravatar), d: 'retro' })}
      alt="avatar"
    />
  );
};

export default Avatar;
