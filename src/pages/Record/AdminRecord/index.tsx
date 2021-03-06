import React, { useCallback, useEffect } from 'react';
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
  const isRefetch = useAppSelector((state) => state.record.isRefetch);
  const curCursor = useAppSelector((state) => state.record.adminRecordTableHeadByUser.cursor);
  const page = useAppSelector((state) => state.record.adminRecordTableHeadByUser.page);
  const perPage = useAppSelector((state) => state.record.adminRecordTableHeadByUser.perPage);
  const sortKey = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort.sortKey);
  const sortValue = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort.sortValue);
  const searchTerm = useAppSelector((state) => state.record.adminRecordTableHeadByUser.searchTerm);
  const startDate = useAppSelector((state) => state.record.adminRecordTableHeadByUser.startDate);
  const endDate = useAppSelector((state) => state.record.adminRecordTableHeadByUser.endDate);

  const { data, isLoading, isError, isFetching } = useGetRecordsQuery({
    page,
    perPage,
    sortKey,
    sortValue,
    endDate,
    searchTerm,
    startDate,
    isRefetch,
  });
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
    if (!isLoading && !isFetching && isError) {
      toast.error('????????? ???????????? ???????????????.');
    }
  }, [isError, isLoading, isFetching]);

  useEffect(() => {
    if (!isDeleteManyLoading && isDeleteManySuccess) {
      toast.success('????????? ?????????????????????.');
      socket.emit('deleteRecords');
    }
    if (!isDeleteManyLoading && isDeleteManyError) toast.error('???????????? ????????? ??????????????????.');
  }, [isDeleteManyLoading, isDeleteManyError, isDeleteManySuccess]);

  const deleteManyRecords = useCallback(() => {
    if (!selectedList.length) {
      toast.error('????????? ????????? ????????????.');
      return;
    }
    const confirm = window.confirm('?????? ???????????????????????? ????????? ????????? ?????????.');
    if (confirm) {
      deleteRecordsMutation({ ids: selectedList });
    }
  }, [selectedList, deleteRecordsMutation]);

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <Spinner classes="h-7 w-7" />
        </div>
      ) : (
        <div className="w-fit mt-10 mx-auto space-y-3">
          <button
            onClick={deleteManyRecords}
            className="py-1 px-3 bg-gray-500 text-gray-50 font-medium text-xs rounded-md shadow-sm hover:ring-1 ring-gray-500 active:ring-0"
          >
            ?????? ?????? ??????
          </button>
          <AdminTable
            page={
              <Page
                curPage={page}
                curCursor={curCursor}
                totalPage={data?.totalPage}
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
      )}
    </>
  );
};

export default Record;
