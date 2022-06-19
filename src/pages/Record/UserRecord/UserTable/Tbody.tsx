import React from 'react';
import Sticker from '@components/Sticker';
import { record } from '@models/record';

interface props {
  tbody: record[];
}

const Tbody: React.FC<props> = ({ tbody }) => {
  if (tbody == null || !tbody?.length) return null;
  return (
    <tbody className="font-medium text-gray-700 divide-y-[2px] divide-gray-100">
      {tbody?.map(({ id, startTime, endTime, duration, status }) => {
        if (id == null || !startTime) return null;
        const startDate = new Date(startTime);
        const endDate = endTime ? new Date(endTime) : '-';
        const durationGetTime = getTime(duration);

        return (
          <tr key={id} className="whitespace-nowrap hover:bg-orange-50">
            <td className="py-3 text-center">{startDate.toLocaleDateString()}</td>
            <td className="py-3 text-center ">
              {startDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>

            <td className="text-center py-3 ">
              {endDate == '-' ? '-' : endDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="text-center py-3 ">{durationGetTime}</td>
            <td className="text-center py-3 ">
              <Sticker
                classes="inline w-fit h-fit py-[4px] text-[10px] px-[5px] md:px-[6px] shadow-md"
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
