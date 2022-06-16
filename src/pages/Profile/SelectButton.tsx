import React from 'react';

interface props {
  onClick: () => void;
  title: string;
}

const SelectButton: React.FC<props> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="first-letter:uppercase px-2 py-1 font-medium text-sm border-[1px] rounded-md shadow-md text-gray-800 ring-gray-200 hover:ring-[1px] active:ring-0"
    >
      {title}
    </button>
  );
};

export default SelectButton;
