import { record } from '@models/record';
import { TableHead } from '@models/tables';
import React from 'react';
import Tbody from './Tbody';
import Thead from './Thead';

interface props {
  thead: TableHead[];
  tbody: record[];
}

const UserTable: React.FC<props> = ({ thead, tbody }) => {
  return (
    <table className="text-[12px] sm:text-xs lg:text-sm mx-auto mt-10 table-auto border shadow-md rounded-sm">
      <Thead thead={thead} />
      <Tbody tbody={tbody} />
    </table>
  );
};

export default UserTable;
