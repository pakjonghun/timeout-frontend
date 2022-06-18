import { recordWithUser } from '@models/record';
import { TableHead } from '@models/tables';
import React from 'react';
import Tbody from './Tbody';
import Thead from './Thead';

interface props {
  thead: TableHead[];
  tbody: recordWithUser[];
}

const AdminTable: React.FC<props> = ({ thead, tbody }) => {
  return (
    <table className="text-[11px] md:text-xs mx-auto mt-10 table-auto border shadow-md rounded-sm">
      <Thead thead={thead} />
      <Tbody tbody={tbody} />
    </table>
  );
};

export default AdminTable;
