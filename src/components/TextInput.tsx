import { joinStyle } from '@utils/styleUtils';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface props {
  id: string;
  classes?: string;
  isLabelShow?: boolean;
  type?: 'file' | 'text';
  register?: UseFormRegisterReturn;
}

const TextInput: React.FC<props> = ({ register, type = 'text', id, isLabelShow = true, classes }) => {
  return (
    <label className="flex flex-col" htmlFor={id}>
      {isLabelShow && <span className="ml-1 font-bold text-md first-letter:uppercase text-gray-800">{id}</span>}
      <input
        {...register}
        type={type}
        id={id}
        placeholder={id}
        className={joinStyle(
          'border-gray-300 border-[1px] placeholder:lowercase py-2 px-3 bg-gray-100 rounded-md shadow-md text-sm font-medium focus:outline-none focus:border-pink-300 focus:ring-pink-300 focus:ring-1 placeholder:text-gray-400',
          classes ? classes : '',
        )}
      />
    </label>
  );
};

export default TextInput;
