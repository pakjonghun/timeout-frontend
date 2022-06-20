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

const Record = () => {
  const dispatch = useAppDispatch();
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

  switch (true) {
    case isLoading:
      return <Spinner classes="h-5 w-5" />;
    case Boolean(data?.data.role == 'Manager'):
      return <AdminRecord onValid={onValidForAdmin} />;
    case Boolean(data?.data.role == 'Client'):
      return <UserRecord onValid={onValidForUser} />;
    default:
      throw new Error('Error on record page');
  }
};

export default Record;
