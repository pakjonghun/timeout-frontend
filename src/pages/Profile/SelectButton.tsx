import React from 'react';
import { joinStyle } from '@utils/styleUtils';

interface props {
  onClick: () => void;
  title: string;
  type?: 'button' | 'submit';
  classes?: string;
}

const SelectButton: React.FC<props> = ({ classes, type = 'button', onClick, title }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={joinStyle(
        'first-letter:uppercase px-2 py-1 font-medium text-sm border-[1px] rounded-md shadow-md text-gray-800 ring-gray-200 hover:ring-[1px] active:ring-0',
        classes ? classes : '',
      )}
    >
      {title}
    </button>
  );
};

export default SelectButton;
