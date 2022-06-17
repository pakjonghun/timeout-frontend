import { joinStyle } from '@utils/styleUtils';
import React from 'react';

interface props {
  title: string;
  role?: 'save' | 'cancel';
  onClick?: () => void;
  type?: 'submit' | 'button';
  classes?: string;
}

const ConfirmButton: React.FC<props> = ({ classes, title, role = 'save', type = 'submit', onClick }) => {
  return (
    <button
      {...(onClick && { onClick })}
      type={type}
      className={joinStyle(
        'first-letter:uppercase px-5 py-2 rounded-md shadow-md font-medium text-sm hover:ring-1 active:ring-0 transition-all duration-75',
        role == 'save' ? 'bg-pink-500 text-pink-50 ring-pink-500' : 'bg-gray-50 text-gray-800 ring-gray-200',
        classes ? classes : '',
      )}
    >
      {title}
    </button>
  );
};

export default ConfirmButton;
