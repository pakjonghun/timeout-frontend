import React, { useCallback } from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import Spinner from '@components/Spinner';
import UserRecord from './UserRecord';
import AdminRecord from './AdminRecord';
import { useAppDispatch } from '@hooks/useRedux';
import { searchForm } from '@models/record';
import {
  setAdminEndtDate,
  setAdminSearchTerm,
  setAdminStartDate,
  setUserEndtDate,
  setUserSearchTerm,
  setUserStartDate,
} from '@redux/features/record';
import MainLayout from '@components/MainLayout';
import SearchForm from './SearchForm';
import { useLocation } from 'react-router-dom';

const Record = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { data, isLoading } = useGetMyInfoQuery();

  const onValidForUser = useCallback(
    ({ searchTerm, endDate, startDate }: searchForm) => {
      dispatch(setUserSearchTerm(searchTerm || null));
      dispatch(setUserEndtDate(endDate || null));
      dispatch(setUserStartDate(startDate || null));
    },
    [dispatch],
  );

  const onValidForAdmin = useCallback(
    ({ searchTerm, endDate, startDate }: searchForm) => {
      dispatch(setAdminSearchTerm(searchTerm || null));
      dispatch(setAdminEndtDate(endDate || null));
      dispatch(setAdminStartDate(startDate || null));
    },
    [dispatch],
  );

  return (
    <MainLayout
      title={
        pathname == '/search' ? (
          <SearchForm onValid={data?.data.role == 'Manager' ? onValidForAdmin : onValidForUser} />
        ) : (
          'Record'
        )
      }
    >
      {isLoading ? <Spinner classes="h-5 w-5" /> : data?.data.role === 'Manager' ? <AdminRecord /> : <UserRecord />}
    </MainLayout>
  );
};

export default Record;
