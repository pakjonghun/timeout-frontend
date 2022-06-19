import Page from '@components/Page';
import { record } from '@models/record';
import { TableHead } from '@models/tables';
import React from 'react';
import Tbody from './Tbody';
import Thead from './Thead';

interface props {
  thead: TableHead[];
  tbody: record[];
  page: React.ReactNode;
}

const UserTable: React.FC<props> = ({ thead, tbody, page }) => {
  return (
    <>
      <table className="text-[12px] sm:text-xs lg:text-sm mx-auto mt-10 table-auto border shadow-md rounded-sm">
        <Thead thead={thead} />
        <Tbody tbody={tbody} />
      </table>
      {page}
    </>
  );
};

export default UserTable;
