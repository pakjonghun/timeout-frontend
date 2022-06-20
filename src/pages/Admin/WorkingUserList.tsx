import { getTime } from '@utils/commonUtils';
import React from 'react';

interface props {
  userList: { id: number; name: string; sumDuration: number }[];
}

const WorkingUserList: React.FC<props> = ({ userList }) => {
  for (let i = 0; i < 105; i++) {
    userList.push({ id: 13, name: '!@321', sumDuration: 123123 });
  }
  return (
    <ul className="h-[27rem] overflow-y-auto">
      <li className="h-14 bg-gray-100 sticky grid grid-cols-2 place-items-center top-0 font-medium text-sm text-gray-500 whitespace-nowrap border-b-2">
        <span>이름</span>
        <span>총 근무시간</span>
      </li>
      {userList.map(({ id, name, sumDuration }) => (
        <React.Fragment key={id}>
          <li className="grid grid-cols-2 place-items-center py-2 text-xs text-gray-800 bg-gray-50">
            <span>{name}</span>
            <span> {getTime(sumDuration)}</span>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default WorkingUserList;
