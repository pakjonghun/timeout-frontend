import React, { useCallback, useEffect, useRef } from 'react';
import Sticker from '@components/Sticker';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { recordWithUser } from '@models/record';
import {
  setIsRefetch,
  toggleAdminOpenedItem,
  toggleAdminRecordTableHeadByUserSelectedItem,
} from '@redux/features/record';
import { joinStyle } from '@utils/styleUtils';
import EditRow from './EditRow';
import Td from './Td';
import { useDeleteRecordMutation } from '@redux/services/record';
import { toast } from 'react-toastify';
import socket from '../../../../socket.io';
import { getTime } from '@utils/commonUtils';

interface props {
  tbody: recordWithUser[];
}

const Tbody: React.FC<props> = ({ tbody }) => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector((state) => state.record.adminRecordTableHeadByUser.selectedItemList);
  const openedId = useAppSelector((state) => state.record.adminRecordTableHeadByUser.openedItemId);
  const [deleteRecordMutation, { isSuccess, isLoading, isError }] = useDeleteRecordMutation();

  const deletedItem = useRef<{ id: number | null; date: Date | null }>({ id: null, date: null });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('삭제가 완료되었습니다.');
      socket.emit('deleteRecord', { id: deletedItem.current.id, date: deletedItem.current.date });
    }
    if (!isLoading && isError) toast.error('근무기록 삭제를 실패했습니다.');
  }, [isLoading, isError, isSuccess]);

  const onEditClick = useCallback(
    (id: number) => {
      dispatch(toggleAdminOpenedItem(id));
    },
    [dispatch],
  );

  const onDeleteClick = useCallback(
    ({ id, date, userId }: { userId: number; id: number; date: Date }) => {
      const confirm = window.confirm('정말 삭제 하시겠습니까?');
      if (confirm) {
        deleteRecordMutation({ id });
        deletedItem.current.id = userId;
        deletedItem.current.date = date;
      }
    },
    [deleteRecordMutation],
  );

  if (tbody == null || !tbody?.length) return null;

  return (
    <tbody className="font-medium text-gray-700 divide-y-[2px] divide-gray-100">
      {tbody?.map(({ id, startTime, endTime, description, user, duration, status }) => {
        if (id == null || !startTime || !description || !user) return null;
        const startDate = new Date(startTime);
        const endDate = endTime ? new Date(endTime) : '-';
        const durationGetTime = getTime(duration);

        return (
          <React.Fragment key={id}>
            <tr
              onClick={(event) => {
                if ((event.target as HTMLElement).tagName === 'BUTTON') {
                  return;
                }
                dispatch(toggleAdminRecordTableHeadByUserSelectedItem(id));
              }}
              className={joinStyle('cursor-pointer whitespace-nowrap', selectedList.includes(id) ? 'bg-orange-50' : '')}
            >
              <Td
                classes="pl-3"
                content={
                  <>
                    <input
                      checked={selectedList.includes(id)}
                      onChange={() => {}}
                      className="w-3 h-3 mr-1 mb-[3px] focus:outline-none focus:ring-0 focus:ring-gray-100 rounded-sm"
                      type="checkBox"
                      id={id + ''}
                    />
                    <span className="hidden lg:inline">개별선택</span>
                  </>
                }
              />
              <Td content={user?.name} />
              <Td content={startDate.toLocaleDateString()} />
              <Td content={startDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} />
              <Td
                content={
                  endDate == '-' ? '-' : endDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                }
              />
              <Td content={durationGetTime} />
              <Td
                content={
                  <Sticker
                    classes="inline w-fit h-fit py-[3px] text-[10px] px-[5px] md:px-[6px] shadow-md"
                    title={status}
                  />
                }
              />
              <Td
                classes="space-x-3"
                content={
                  <>
                    <button
                      onClick={() => onEditClick(id)}
                      className={joinStyle(
                        openedId === id ? 'text-gray-500' : 'text-gray-300',
                        'font-bold hover:text-gray-800 active:text-gray-500',
                      )}
                    >
                      {openedId === id ? '닫기' : '편집'}
                    </button>
                    <button
                      onClick={() => onDeleteClick({ id, userId: user.id, date: startDate })}
                      className="font-bold hover:text-gray-800 text-gray-300 active:text-gray-500"
                    >
                      삭제
                    </button>
                  </>
                }
              />
            </tr>
            <EditRow item={{ startTime, endTime, description }} userId={user.id} id={id} />
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default Tbody;
