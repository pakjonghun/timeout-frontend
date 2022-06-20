import React, { useCallback } from 'react';
import MainLayout from '@components/MainLayout';
import { useGetRecordsQuery } from '@redux/services/record';
import Spinner from '@components/Spinner';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import UserTable from './UserTable';
import { record, searchForm } from '@models/record';
import Page from '@components/Page';
import { setCursorUserRecordTableHeadByRecent, setPageUserRecordTableHeadByRecent } from '@redux/features/record';
import { perCursor } from '@models/tables';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm';

interface props {
  onValid: ({ searchTerm, startDate, endDate }: searchForm) => void;
}

const Record: React.FC<props> = ({ onValid }) => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const curCursor = useAppSelector((state) => state.record.userRecordTableHeadByRecent.cursor);
  const page = useAppSelector((state) => state.record.userRecordTableHeadByRecent.page);
  const perPage = useAppSelector((state) => state.record.userRecordTableHeadByRecent.perPage);
  const sortKey = useAppSelector((state) => state.record.userRecordTableHeadByRecent.sort.sortKey);
  const sortValue = useAppSelector((state) => state.record.userRecordTableHeadByRecent.sort.sortValue);
  const searchTerm = useAppSelector((state) => state.record.userRecordTableHeadByRecent.searchTerm);
  const startDate = useAppSelector((state) => state.record.userRecordTableHeadByRecent.startDate);
  const endDate = useAppSelector((state) => state.record.userRecordTableHeadByRecent.endDate);

  const { data, isLoading } = useGetRecordsQuery({ page, perPage, sortKey, sortValue, endDate, searchTerm, startDate });
  const userThead = useAppSelector((state) => [...state.record.userRecordTableHeadByRecent.thead]);
  const userData = data?.data as unknown as record[];

  const onPageClick = useCallback(
    (curPage: number) => {
      dispatch(setPageUserRecordTableHeadByRecent(curPage));
    },
    [dispatch],
  );

  const onNextCursor = useCallback(() => {
    const totalCursor = Math.ceil(data!.totalPage / perCursor);
    const lastPageInCurCursor = curCursor * perCursor;
    dispatch(setPageUserRecordTableHeadByRecent(page < data!.totalPage ? page + 1 : page));
    if (page === lastPageInCurCursor && page !== data!.totalPage) {
      dispatch(setCursorUserRecordTableHeadByRecent(curCursor < totalCursor ? curCursor + 1 : curCursor));
    }
  }, [data, curCursor, page, dispatch]);

  const onPreviousCursor = useCallback(() => {
    const firstPageInCurCursor = 1 + (curCursor - 1) * perCursor;
    dispatch(setPageUserRecordTableHeadByRecent(page > 1 ? page - 1 : page));

    if (page == firstPageInCurCursor && page !== 1) {
      dispatch(setCursorUserRecordTableHeadByRecent(curCursor > 1 ? curCursor - 1 : curCursor));
    }
  }, [curCursor, page, dispatch]);

  const onFirstClick = useCallback(() => {
    dispatch(setCursorUserRecordTableHeadByRecent(1));
    dispatch(setPageUserRecordTableHeadByRecent(1));
  }, [dispatch]);

  const onLastClick = useCallback(() => {
    const totalCursor = Math.ceil(data!.totalPage / perCursor);
    dispatch(setCursorUserRecordTableHeadByRecent(totalCursor));
    dispatch(setPageUserRecordTableHeadByRecent(data!.totalPage));
  }, [data, dispatch]);

  if (isLoading) return <Spinner classes="h-5 w-5" />;

  return (
    <MainLayout title={pathname == '/search' ? <SearchForm onValid={onValid} /> : 'Record'}>
      <UserTable
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
        thead={userThead}
        tbody={userData}
      />
    </MainLayout>
  );
};

export default Record;
