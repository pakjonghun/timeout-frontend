import Sticker from '@components/Sticker';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { recordWithUser } from '@models/record';
import { toggleAdminRecordTableHeadByUserSelectedItem } from '@redux/features/record';
import { joinStyle } from '@utils/styleUtils';
import React, { useEffect } from 'react';

interface props {
  tbody: recordWithUser[];
}

const Tbody: React.FC<props> = ({ tbody }) => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector((state) => state.record.adminRecordTableHeadByUser.selectedItemList);

  if (tbody == null || !tbody?.length) return null;

  return (
    <tbody className="font-medium text-gray-700 divide-y-[2px] divide-gray-100">
      {tbody?.map(({ id, startTime, endTime, description, user, duration, status }) => {
        if (id == null || !startTime || !description || !user) return null;
        const startDate = new Date(startTime);
        const endDate = endTime ? new Date(endTime) : '-';
        const durationGetTime = getTime(duration);

        return (
          <tr
            key={id}
            onClick={(event) => {
              dispatch(toggleAdminRecordTableHeadByUserSelectedItem(id));
            }}
            className={joinStyle(
              'cursor-pointer whitespace-nowrap active:bg-orange-50',
              selectedList.includes(id) ? 'bg-orange-50' : '',
            )}
          >
            <td className="text-center py-3 pl-3">
              <input
                checked={selectedList.includes(id)}
                onChange={() => {}}
                className="w-3 h-3 mr-1 mb-[3px] focus:outline-none focus:ring-0 focus:ring-gray-100 rounded-sm"
                type="checkBox"
                id={id + ''}
              />
              <span className="hidden lg:inline">개별선택</span>
            </td>
            <td className="text-center py-3">{user?.name}</td>
            <td className="text-center py-3">{startDate.toLocaleDateString()}</td>
            <td className="text-center py-3">
              {startDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="text-center py-3">
              {endDate == '-' ? '-' : endDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="text-center py-3">{durationGetTime}</td>
            <td className="text-center py-3">
              <Sticker
                classes="inline w-fit h-fit py-[3px] text-[10px] px-[5px] md:px-[6px] shadow-md"
                title={status}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;

function getTime(duration: number) {
  const minuteTerm = 1000 * 60;
  const hourTerm = 1000 * 60 * 60;

  const hour = Math.abs(Math.floor(duration / hourTerm));
  const minute = Math.round(((duration % hourTerm) * (hour || 1)) / minuteTerm);

  return `0${hour}:${minute.toString().length == 2 ? minute : '0' + minute}`;
}
