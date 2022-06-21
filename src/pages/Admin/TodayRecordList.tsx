import React from 'react';
import { useAppSelector } from '@hooks/useRedux';
import { getFullTime, getTime } from '@utils/commonUtils';

const TodayRecordList = () => {
  const doneList = useAppSelector((state) => state.admin.doneUserList);

  return (
    <div className="h-[27rem] overflow-y-auto pt-0 pb-5 bg-gray-50">
      <table className="table-auto w-full">
        <thead className="h-14 bg-gray-100 sticky top-0 font-medium text-sm text-gray-500 whitespace-nowrap">
          <tr>
            <td className="py-2 px-2 text-center">시작시간</td>
            <td className="py-2 px-2 text-center">종료시간</td>
            <td className="py-2 px-2 text-center">근무시간</td>
          </tr>
          <tr className="bg-gray-200 h-[2.5px]">
            <td colSpan={3}></td>
          </tr>
        </thead>
        <tbody className="font-medium text-sm text-gray-800 whitespace-nowrap">
          {doneList.map(({ id, role, name, recordList, listCount }) => (
            <React.Fragment key={id}>
              <tr className="font-medium text-gray-500">
                <td colSpan={5} className="pl-5 pt-5 pb-3 text-xs">{`${role}  ${name} 님 ${listCount}건`}</td>
              </tr>
              {recordList.map(({ id, endTime, startTime, duration }) => (
                <tr key={id} className="text-xs text-gray-800 divide-x-[1px]">
                  <td className="py-4 px-2 text-center">{getFullTime(new Date(startTime))}</td>
                  <td className="py-4 px-2 text-center">{getFullTime(new Date(endTime))}</td>
                  <td className="py-4 px-2 text-center">{getTime(duration)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayRecordList;
