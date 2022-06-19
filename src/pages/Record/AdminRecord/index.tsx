import React, { useCallback, useEffect } from 'react';
import MainLayout from '@components/MainLayout';
import { useDeleteManyRecordsMutation, useGetRecordsQuery } from '@redux/services/record';
import Spinner from '@components/Spinner';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import AdminTable from './AdminTable';
import { recordWithUser } from '@models/record';
import Page from '@components/Page';
import { setCursorAdminRecordTableHeadByUser, setPageAdminRecordTableHeadByUser } from '@redux/features/record';
import { perCursor } from '@models/tables';
import { toast } from 'react-toastify';
import socket from '../../../socket.io';

const Record = () => {
  const dispatch = useAppDispatch();
  const curCursor = useAppSelector((state) => state.record.adminRecordTableHeadByUser.cursor);
  const page = useAppSelector((state) => state.record.adminRecordTableHeadByUser.page);
  const perPage = useAppSelector((state) => state.record.adminRecordTableHeadByUser.perPage);
  const sortKey = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort.sortKey);
  const sortValue = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort.sortValue);
  const { data, isLoading } = useGetRecordsQuery({ page, perPage, sortKey, sortValue });
  const adminThead = useAppSelector((state) => [...state.record.adminRecordTableHeadByUser.thead]);
  const adminData = data?.data as unknown as recordWithUser[];
  const selectedList = useAppSelector((state) => state.record.adminRecordTableHeadByUser.selectedItemList);

  const onPageClick = useCallback(
    (curPage: number) => {
      dispatch(setPageAdminRecordTableHeadByUser(curPage));
    },
    [dispatch],
  );

  const onNextCursor = useCallback(() => {
    const totalCursor = Math.ceil(data!.totalPage / perCursor);
    const lastPageInCurCursor = curCursor * perCursor;
    dispatch(setPageAdminRecordTableHeadByUser(page < data!.totalPage ? page + 1 : page));
    if (page === lastPageInCurCursor && page !== data!.totalPage) {
      dispatch(setCursorAdminRecordTableHeadByUser(curCursor < totalCursor ? curCursor + 1 : curCursor));
    }
  }, [data, curCursor, page, dispatch]);

  const onPreviousCursor = useCallback(() => {
    const firstPageInCurCursor = 1 + (curCursor - 1) * perCursor;
    dispatch(setPageAdminRecordTableHeadByUser(page > 1 ? page - 1 : page));

    if (page == firstPageInCurCursor && page !== 1) {
      dispatch(setCursorAdminRecordTableHeadByUser(curCursor > 1 ? curCursor - 1 : curCursor));
    }
  }, [curCursor, page, dispatch]);

  const onFirstClick = useCallback(() => {
    dispatch(setCursorAdminRecordTableHeadByUser(1));
    dispatch(setPageAdminRecordTableHeadByUser(1));
  }, [dispatch]);

  const onLastClick = useCallback(() => {
    const totalCursor = Math.ceil(data!.totalPage / perCursor);
    dispatch(setCursorAdminRecordTableHeadByUser(totalCursor));
    dispatch(setPageAdminRecordTableHeadByUser(data!.totalPage));
  }, [data, dispatch]);

  const [
    deleteRecordsMutation,
    { isSuccess: isDeleteManySuccess, isLoading: isDeleteManyLoading, isError: isDeleteManyError },
  ] = useDeleteManyRecordsMutation();

  useEffect(() => {
    if (!isDeleteManyLoading && isDeleteManySuccess) {
      toast.success('삭제가 완료되었습니다.');
      socket.emit('deleteRecords');
    }
    if (!isDeleteManyLoading && isDeleteManyError) toast.error('근무기록 삭제를 실패했습니다.');
  }, [isDeleteManyLoading, isDeleteManyError, isDeleteManySuccess]);

  const deleteManyRecords = useCallback(() => {
    if (!selectedList.length) {
      toast.error('선택된 기록이 없습니다.');
      return;
    }
    const confirm = window.confirm('정말 삭제하시겠습니까 복구가 불가능 합니다.');
    if (confirm) {
      deleteRecordsMutation({ ids: selectedList });
    }
  }, [selectedList, deleteRecordsMutation]);

  if (isLoading) return <Spinner classes="h-5 w-5" />;

  return (
    <MainLayout title="Record">
      <div className="w-fit mt-10 mx-auto space-y-3">
        <button
          onClick={deleteManyRecords}
          className="py-1 px-3 bg-gray-500 text-gray-50 font-medium text-xs rounded-md shadow-sm hover:ring-1 ring-gray-500 active:ring-0"
        >
          선택 기록 삭제
        </button>
        <AdminTable
          page={
            <Page
              curPage={page}
              curCursor={curCursor}
              totalPage={data!.totalPage}
              onPageClick={onPageClick}
              onLastClick={onLastClick}
              onNextCursor={onNextCursor}
              onFirstClick={onFirstClick}
              onPreviousCursor={onPreviousCursor}
            />
          }
          thead={adminThead}
          tbody={adminData}
        />
      </div>
    </MainLayout>
  );
};

export default Record;
