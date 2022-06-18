import Sticker from '@components/Sticker';
import { record } from '@models/record';
import React from 'react';

interface props {
  tbody: record[];
}

const Tbody: React.FC<props> = ({ tbody }) => {
  return (
    <tbody className="divide-y divide-gray-300 hover:bg-gray-50">
      {tbody.map(({ id, startTime, endTime, description }) => {
        if (id == null || !startTime || !description) return null;
        const startDate = new Date(startTime);
        const endDate = endTime ? new Date(endTime) : '-';
        const duration = endDate == '-' ? '-' : getTime(endDate.getTime() - startDate.getTime());
        const status = endTime ? 'working' : 'done';
        return (
          <tr key={id} className="whitespace-nowrap">
            <td className="py-3 text-center text-gray-800">{startDate.toLocaleDateString()}</td>
            <td className="py-3 text-center text-gray-800">
              {startDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>

            <td className="text-center py-3 text-gray-800">
              {endDate == '-' ? '-' : endDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="text-center py-3 text-gray-800">{duration}</td>
            <td className="text-center py-3 text-gray-800">
              <Sticker
                classes="sm:text-xs sm:py-1 sm:px-2 text-[8px] py-[1px] px-[2px] md:py-2 shadow-md"
                title={status}
              />
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
