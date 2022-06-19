import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { AdminRecordTableHeadByUserKeys, TableHead } from '@models/tables';
import {
  setAdminRecordTableHeadByUserIsAllSelected,
  setSortAdminRecordTableHeadByUser,
  toggleAdminRecordTableHeadByUserSelectedItemList,
} from '@redux/features/record';
import { joinStyle } from '@utils/styleUtils';

interface props {
  thead: TableHead[];
  idList: number[];
}

const Thead: React.FC<props> = ({ idList, thead }) => {
  const { sortKey, sortValue } = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort);
  const isAllSelected = useAppSelector((state) => state.record.adminRecordTableHeadByUser.isAllSelected);

  const dispatch = useAppDispatch();
  const onSortButtonClick = useCallback(
    (key: string) => {
      const sortKey = key as AdminRecordTableHeadByUserKeys;
      dispatch(setSortAdminRecordTableHeadByUser(sortKey));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(setAdminRecordTableHeadByUserIsAllSelected({ idList }));
  }, [idList, dispatch]);

  return (
    <thead className="text-gray-500 font-medium bg-gray-100">
      <tr className="whitespace-nowrap border-b-1">
        {thead.map(({ id, title, key }, index) => {
          if (title == '#' || key == 'select') {
            return (
              <th key={id} className="text-center py-3 pl-2 md:pl-3 lg:px-4 xl:px-5">
                <input
                  checked={isAllSelected}
                  onChange={(event) =>
                    dispatch(
                      toggleAdminRecordTableHeadByUserSelectedItemList({
                        idList,
                        checked: event.currentTarget.checked,
                      }),
                    )
                  }
                  className="w-3 h-3 mr-1 mb-[3px] focus:outline-none focus:ring-0 focus:ring-gray-100  rounded-sm"
                  type="checkBox"
                  id={id + ''}
                />
                <label className="cursor-pointer hidden lg:inline" htmlFor={id + ''}>
                  전체선택
                </label>
              </th>
            );
          }

          return (
            <th
              key={id}
              className={joinStyle(
                'text-center py-3 px-5 md:px-7 lg:px-10',
                index === 1 ? 'px-4 md:px-5 lg:px-6' : '',
                index === 2 ? 'px-6 md:px-8 lg:px-11' : '',
                index === 5 ? 'px-4 md:px-5 lg:px-6' : '',
                index === 6 ? 'px-4 md:px-5 lg:px-6' : '',
              )}
            >
              <label htmlFor={id + ''} className="space-x-1">
                <span className="inline-block">{title}</span>
                <button
                  onClick={() => onSortButtonClick(key)}
                  className={joinStyle('', sortKey === key && sortValue ? 'fill-gray-800' : 'fill-gray-300')}
                >
                  {key !== 'admin' && key === sortKey && sortValue == 'ASC' && (
                    <svg className="h-3 w-3 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z" />
                    </svg>
                  )}
                  {key !== 'admin' && key === sortKey && sortValue == 'DESC' && (
                    <svg className="h-3 w-3 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z" />
                    </svg>
                  )}
                  {key !== 'admin' && sortKey !== key && (
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
