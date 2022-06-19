import React from 'react';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import Spinner from '@components/Spinner';
import UserRecord from './UserRecord';
import AdminRecord from './AdminRecord';

const Record = () => {
  const { data, isLoading } = useGetMyInfoQuery();

  switch (true) {
    case isLoading:
      return <Spinner classes="h-5 w-5" />;
    case Boolean(data?.data.role == 'Manager'):
      return <AdminRecord />;
    case Boolean(data?.data.role == 'Client'):
      return <UserRecord />;
    default:
      throw new Error('Error on record page');
  }
};

export default Record;
