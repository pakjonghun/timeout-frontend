import React from 'react';
import { joinStyle } from '@utils/styleUtils';
import { perCursor } from '@models/tables';

interface props {
  totalPage: number;
  curPage: number;
  curCursor: number;
  onPageClick: (page: number) => void;
  onNextCursor: () => void;
  onPreviousCursor: () => void;
  onFirstClick: () => void;
  onLastClick: () => void;
}

const Page: React.FC<props> = ({
  curPage,
  curCursor,
  totalPage,
  onPreviousCursor,
  onNextCursor,
  onLastClick,
  onFirstClick,
  onPageClick,
}) => {
  const tempArray = Array.from(Array(totalPage), (_, i) => i + 1).slice(
    (curCursor - 1) * perCursor,
    (curCursor - 1) * perCursor + perCursor,
  );

  return (
    <ul className="flex items-center space-x-3 w-fit mx-auto my-5 font-medium text-sm text-gray-400 fill-gray-400 cursor-pointer">
      <li onClick={onFirstClick} className="active:text-gray-500 hover:text-gray-800">
        처음
      </li>

      <li onClick={onPreviousCursor} className="active:text-gray-500 hover:fill-gray-800">
        <svg className="h-4 w-4 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
        </svg>
      </li>
      {tempArray.map((v) => (
        <li
          onClick={() => onPageClick(v)}
          className={joinStyle('active:text-gray-500 hover:text-gray-800', curPage == v ? 'text-gray-800' : '')}
          key={`page${v}`}
        >
          {v}
        </li>
      ))}
      <li onClick={onNextCursor} className="active:text-gray-500 hover:fill-gray-800">
        <svg className="h-4 w-4 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
        </svg>
      </li>
      <li onClick={onLastClick} className="active:text-gray-500 hover:text-gray-800">
        마지막
      </li>
    </ul>
  );
};

export default Page;
