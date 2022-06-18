import Sticker from '@components/Sticker';
import { recordWithUser } from '@models/record';
import React from 'react';

interface props {
  tbody: recordWithUser[];
}

const Tbody: React.FC<props> = ({ tbody }) => {
  return (
    <tbody className="divide-y divide-gray-300 hover:bg-gray-50">
      {tbody.map(({ id, startTime, endTime, description, user }) => {
        if (id == null || !startTime || !description || !user) return null;
        const startDate = new Date(startTime);
        const endDate = endTime ? new Date(endTime) : '-';
        const duration = endDate == '-' ? '-' : getTime(endDate.getTime() - startDate.getTime());
        const status = endTime ? 'working' : 'done';
        return (
          <tr key={id} className="whitespace-nowrap">
            <td className="text-center py-3 pl-3 text-gray-800">
              <input
                className="w-3 h-3 mr-1 mb-[3px] focus:outline-none focus:ring-0 focus:ring-gray-100 focus:text-pink-500 rounded-sm"
                type="checkBox"
                id={id + ''}
              />
              <label className="hidden lg:inline" htmlFor={id + ''}>
                개별선택
              </label>
            </td>
            <td className="text-center py-3 text-gray-800">{user?.name}</td>
            <td className="text-center py-3 text-gray-800">{startDate.toLocaleDateString()}</td>
            <td className="text-center py-3 text-gray-800">
              {startDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="text-center py-3 text-gray-800">
              {endDate == '-' ? '-' : endDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="text-center py-3 text-gray-800">{duration}</td>
            <td className="text-center py-3 text-gray-800">
              <Sticker classes="sm:text-[10px] sm:py-1 sm:px-2 text-[8px] py-[1px] px-[2px] shadow-md" title={status} />
            </td>
            <td className="text-center py-3 text-gray-800">{description}</td>
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
