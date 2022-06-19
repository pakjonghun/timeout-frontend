import React, { useCallback } from 'react';
import MainLayout from '@components/MainLayout';
import { useGetRecordsQuery } from '@redux/services/record';
import Spinner from '@components/Spinner';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import AdminTable from './AdminTable';
import { recordWithUser } from '@models/record';
import Page from '@components/Page';
import { setCursorAdminRecordTableHeadByUser, setPageAdminRecordTableHeadByUser } from '@redux/features/record';
import { perCursor } from '@models/tables';

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

  if (isLoading) return <Spinner classes="h-5 w-5" />;

  return (
    <MainLayout title="Record">
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
    </MainLayout>
  );
};

export default Record;
