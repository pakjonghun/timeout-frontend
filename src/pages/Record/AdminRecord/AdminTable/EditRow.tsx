import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { joinStyle } from '@utils/styleUtils';
import { toggleAdminOpenedItem } from '@redux/features/record';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@components/ErrorMessage';
import { useEditRecordMutation } from '@redux/services/record';
import socket from '../../../../socket.io';
import { toast } from 'react-toastify';
import { getFullDate, getFullTime } from '@utils/commonUtils';

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
    setValue,
    formState: { errors },
  } = useForm<editForm>({
    mode: 'onChange',
    defaultValues: {
      date,
      startTime,
      endTime: item?.endTime ? getFullTime(new Date(item.endTime)) : '',
    },
  });

  useEffect(() => {
    if (item?.endTime) {
      setValue('endTime', getFullTime(new Date(item.endTime)));
    }
  }, [item, setValue]);

  const onCancelClick = useCallback(() => {
    dispatch(toggleAdminOpenedItem(id));
    reset();
  }, [id, dispatch, reset]);

  const onSaveClick = useCallback(
    (value: editForm) => {
      const startTime = new Date(`${value.date} ${value.startTime}`);
      const endTime = new Date(`${value.date} ${value.endTime}`);

      if (!value.endTime) {
        editRecordMutation({ id, startTime });
        return;
      }

      editRecordMutation({ id, startTime, endTime });
    },
    [id, editRecordMutation],
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('???????????? ????????? ??????????????????.');
      dispatch(toggleAdminOpenedItem(id));
      socket.emit('editRecord', { id: userId, date: watch('date') });
    }
  }, [isLoading, userId, id, isSuccess, watch, dispatch]);

  useEffect(() => {
    if (!isLoading && !isSuccess && isError) {
      toast.error('???????????? ????????? ??????????????????.');
      dispatch(toggleAdminOpenedItem(id));
    }
  }, [isLoading, userId, id, isSuccess, isError, watch, dispatch]);

  return (
    <tr className={joinStyle(openedId === id ? '' : 'hidden')}>
      <td className="text-center py-10" colSpan={4}>
        <h1 className="font-bold text-lg mb-2">Notice</h1>
        <p className="font-medium">
          ???????????? ?????? ????????? <span className="font-bold text-red-500 text-base italic"> ?????????</span>
        </p>
        <p className="font-medium">???????????? ?????? ??? ???????????? ?????????.</p>
      </td>
      <td className="text-left py-10 " colSpan={4}>
        <form onSubmit={handleSubmit(onSaveClick)} className="grid grid-cols-[4fr_1fr]">
          <div className="space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="dateInput">??????</label>
              <input
                {...register('date', { required: '????????? ???????????????' })}
                id="dateInput"
                type="date"
                className=" rounded-md shadow-md text-xs"
              />
              <ErrorMessage errorMessage={errors.date?.message} />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="startTimeInput">????????????</label>
              <input
                {...register('startTime', {
                  validate: {
                    isBeforeEndTime: (value: string) => {
                      const { endTime, startTime, date } = getValues();
                      if (!endTime || !startTime) return true;

                      const startDate = new Date(`${date} ${value}`);
                      const endtDate = new Date(`${date} ${endTime}`);
                      const isValid = endtDate.getTime() - startDate.getTime() >= 0;

                      if (!isValid) return '???????????? ????????? ????????? ???????????????';
                      else return true;
                    },
                    isBeforeNow: (value: string) => {
                      const { date } = getValues();
                      const valueDate = new Date(`${date} ${value}`);
                      const diffFormNow = new Date().getTime() - valueDate.getTime() + 24 * 1000 * 60 * 60;
                      if (diffFormNow < 0) return '???????????? ????????? ????????? ???????????????.';
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
              <label htmlFor="startTimeInput">????????????</label>
              <input
                {...register('endTime', {
                  validate: {
                    isAfterStartTime: (value?: string) => {
                      if (!value) return true;
                      const { endTime, startTime, date } = getValues();
                      if (!endTime || !startTime) return true;

                      const startDate = new Date(`${date} ${startTime}`);
                      const endtDate = new Date(`${date} ${value}`);
                      const isValid = endtDate.getTime() - startDate.getTime() >= 0;

                      if (!isValid) return '?????????????????? ????????? ????????? ???????????????';
                      else return true;
                    },
                    isBeforeNow: (value?: string) => {
                      if (!value) return true;
                      const { date } = getValues();
                      const valueDate = new Date(`${date} ${value}`);
                      const diffFormNow = new Date().getTime() - valueDate.getTime() + 24 * 1000 * 60 * 60;
                      if (diffFormNow < 0) return '???????????? ????????? ????????? ???????????????.';
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
              ??????
            </button>
            <button
              onClick={onCancelClick}
              type="button"
              className="font-bold hover:text-gray-800 text-gray-300 active:text-gray-500"
            >
              ??????
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default EditRow;
