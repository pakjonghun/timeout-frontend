import { useAppDispatch } from '@hooks/useRedux';
import { TableHead, UserRecordTableHeadByRecentKeys } from '@models/tables';
import { setSortUserRecordTableHeadByRecent } from '@redux/features/record';
import { joinStyle } from '@utils/styleUtils';
import React, { useCallback } from 'react';

interface props {
  thead: TableHead[];
}

const Thead: React.FC<props> = ({ thead }) => {
  const dispatch = useAppDispatch();
  const onSortButtonClick = useCallback(
    (key: string) => {
      const sortKey = key as UserRecordTableHeadByRecentKeys;
      dispatch(setSortUserRecordTableHeadByRecent(sortKey));
    },
    [dispatch],
  );

  return (
    <thead className="text-gray-500 font-medium bg-gray-100">
      <tr className="whitespace-nowrap border-b-1">
        {thead.map(({ id, title, key, sortKey }) => {
          if (title == '#' || key == 'select') {
            return (
              <th key={id} className="text-center py-2 px-4 sm:px-6 md:px-8">
                <input
                  className="mr-1 mb-[3px] focus:ring-0 text-pink-500 focus:text-pink-500 rounded-sm"
                  type="checkBox"
                  id={id + ''}
                />
                <label htmlFor={id + ''}>전체선택</label>
              </th>
            );
          }

          return (
            <th key={id} className="text-center py-2 px-4 sm:px-6 md:px-8">
              <label htmlFor={id + ''} className="space-x-1">
                <span className="inline-block">{title}</span>
                <button
                  onClick={() => onSortButtonClick(key)}
                  className={joinStyle('', sortKey == null ? 'fill-gray-300' : 'fill-gray-800')}
                >
                  {sortKey == 'ASC' && (
                    <svg className="h-3 w-3 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z" />
                    </svg>
                  )}
                  {sortKey == 'DESC' && (
                    <svg className="h-3 w-3 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z" />
                    </svg>
                  )}
                  {sortKey == null && (
                    <svg className="h-3 w-3 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  )}
                </button>
              </label>
              <input className="hidden" type="checkBox" id={id + ''} />
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Thead;
