import React from 'react';
import gravatar from 'gravatar';

interface props {
  src?: string | null;
}

const Avatar: React.FC<props> = ({ src }) => {
  console.log('src');
  if (src)
    return (
      <img
        className="h-10 aspect-square rounded-full transition-all hover:scale-105 active:scale-100 duration-75"
        src={src}
        alt="avatar"
      />
    );

  return (
    <img
      className="rounded-full w-10 h-10 shadow-md"
      src={gravatar.url('avatar', { s: '40px', d: 'retro' })}
      alt="avatar"
    />
  );
};

export default Avatar;
