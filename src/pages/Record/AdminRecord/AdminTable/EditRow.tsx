import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { joinStyle } from '@utils/styleUtils';
import { toggleAdminOpenedItem } from '@redux/features/record';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@components/ErrorMessage';
import { useEditRecordMutation } from '@redux/services/record';
import socket from '../../../../socket.io';
import { toast } from 'react-toastify';

interface props {
  id: number;
  userId: number;
  item: {
    startTime: Date;
    endTime: Date | null;
    description: string | null;
  };
}

interface editForm {
  startTime: string;
  endTime?: string;
  date: string;
}

const EditRow: React.FC<props> = ({ id, userId, item }) => {
  const dispatch = useAppDispatch();
  const openedId = useAppSelector((state) => state.record.adminRecordTableHeadByUser.openedItemId);
  const [editRecordMutation, { isLoading, isSuccess, isError }] = useEditRecordMutation();

  const date = getFullDate(new Date(item.startTime));
  const startTime = getFullTime(new Date(item.startTime));

  const {
    watch,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<editForm>({
    mode: 'onChange',
    defaultValues: {
      date,
      startTime,
      endTime: item?.endTime ? getFullTime(new Date(item.endTime)) : '',
    },
  });

  const onCancelClick = useCallback(() => {
    dispatch(toggleAdminOpenedItem(id));
    reset();
  }, [id, dispatch, reset]);

  const onSaveClick = useCallback(
    (value: editForm) => {
      const startTime = new Date(`${value.date} ${value.startTime}`);
      const endTime = new Date(`${value.date} ${value.endTime}`);

      if (!value.endTime) return editRecordMutation({ id, startTime });
      editRecordMutation({ id, startTime, endTime });
    },
    [id, editRecordMutation],
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      socket.emit('editRecord', { id: userId, date: watch('date') });
      dispatch(toggleAdminOpenedItem(id));
    }
  }, [isLoading, userId, id, isSuccess, watch, dispatch]);

  useEffect(() => {
    if (!isLoading && !isSuccess && isError) {
      toast.error('근무기록 수정이 실패했습니다.');
      dispatch(toggleAdminOpenedItem(id));
    }
  }, [isLoading, userId, id, isSuccess, isError, watch, dispatch]);

  return (
    <tr className={joinStyle(openedId === id ? '' : 'hidden')}>
      <td className="text-center py-10" colSpan={4}>
        <h1 className="font-bold text-lg mb-2">Notice</h1>
        <p className="font-medium">
          초과근무 내용 수정은 <span className="font-bold text-red-500 text-base italic"> 반드시</span>
        </p>
        <p className="font-medium">당사자와 소통 후 진행해야 합니다.</p>
      </td>
      <td className="text-left py-10 " colSpan={4}>
        <form onSubmit={handleSubmit(onSaveClick)} className="grid grid-cols-[4fr_1fr]">
          <div className="space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="dateInput">날짜</label>
              <input
                {...register('date', { required: '날짜를 입력하세요' })}
                id="dateInput"
                type="date"
                className=" rounded-md shadow-md text-xs"
              />
              <ErrorMessage errorMessage={errors.date?.message} />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="startTimeInput">시작시간</label>
              <input
                {...register('startTime', {
                  validate: {
                    // inRange: (value: string) => {
                    //   const [h] = value.split(':');
                    //   if (+h < 19 || +h >= 23) return '초과근무 시간이 아닙니다.';
                    //   return true;
                    // },
                    isBeforeEndTime: (value: string) => {
                      const { endTime, startTime, date } = getValues();
                      if (!endTime || !startTime) return true;

                      const startDate = new Date(`${date} ${value}`);
                      const endtDate = new Date(`${date} ${endTime}`);
                      const isValid = endtDate.getTime() - startDate.getTime() >= 0;

                      if (!isValid) return '종료시간 이전의 시간을 입력하세요';
                      else return true;
                    },
                    isBeforeNow: (value: string) => {
                      const { date } = getValues();
                      const valueDate = new Date(`${date} ${value}`);
                      const diffFormNow = new Date().getTime() - valueDate.getTime();
                      if (diffFormNow < 0) return '지금보다 이전의 시간을 입력하세요.';
                      return true;
                    },
                  },
                })}
                id="startTimeInput"
                type="time"
                className="rounded-md shadow-md text-xs"
              />
              <ErrorMessage errorMessage={errors.startTime?.message} />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="startTimeInput">종료시간</label>
              <input
                {...register('endTime', {
                  validate: {
                    // inRange: (value?: string) => {
                    //   if (!value) return true;
                    //   const [h] = value.split(':');
                    //   if (+h < 19 || +h >= 23) return '초과근무 시간이 아닙니다.';
                    //   return true;
                    // },
                    isAfterStartTime: (value?: string) => {
                      if (!value) return true;
                      const { endTime, startTime, date } = getValues();
                      if (!endTime || !startTime) return true;

                      const startDate = new Date(`${date} ${startTime}`);
                      const endtDate = new Date(`${date} ${value}`);
                      const isValid = endtDate.getTime() - startDate.getTime() >= 0;

                      if (!isValid) return '시작시간보다 이후의 시간을 입력하세요';
                      else return true;
                    },
                    isBeforeNow: (value?: string) => {
                      if (!value) return true;
                      const { date } = getValues();
                      const valueDate = new Date(`${date} ${value}`);
                      const diffFormNow = new Date().getTime() - valueDate.getTime();
                      if (diffFormNow < 0) return '지금보다 이전의 시간을 입력하세요.';
                      return true;
                    },
                  },
                })}
                id="endTimeInput"
                className="rounded-md shadow-md text-xs"
                type="time"
              />
            </div>
            <ErrorMessage errorMessage={errors.endTime?.message} />
          </div>
          <div className=" text-center py-10 space-x-2">
            <button type="submit" className="font-bold hover:text-gray-800 text-gray-300 active:text-gray-500">
              저장
            </button>
            <button
              onClick={onCancelClick}
              type="button"
              className="font-bold hover:text-gray-800 text-gray-300 active:text-gray-500"
            >
              취소
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default EditRow;

function getFullDate(startTime: Date) {
  const date = startTime.getDate();
  const month = startTime.getMonth();
  const year = startTime.getFullYear();

  const d = date < 10 ? `0${date}` : date;
  const m = month < 10 ? `0${month}` : month;

  return `${year}-${m}-${d}`;
}

function getFullTime(startTime: Date) {
  const hour = startTime.getHours();
  const minute = startTime.getMinutes();

  const h = hour < 10 ? `0${hour}` : hour;
  const m = minute < 10 ? `0${minute}` : minute;

  return `${h}:${m}`;
}
