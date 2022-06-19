import React from 'react';
import { recordWithUser } from '@models/record';
import { TableHead } from '@models/tables';
import Tbody from './Tbody';
import Thead from './Thead';

interface props {
  thead: TableHead[];
  tbody: recordWithUser[];
  page: React.ReactNode;
}

const AdminTable: React.FC<props> = ({ page, thead, tbody }) => {
  const idList = tbody.map(({ id }) => id);

  return (
    <>
      <table className="text-[11px] md:text-xs mx-auto mt-10 table-auto border shadow-md rounded-sm">
        <Thead thead={thead} idList={idList} />
        <Tbody tbody={tbody} />
      </table>
      {page}
    </>
  );
};

export default AdminTable;
