import { TableHead } from '@models/tables';
import React from 'react';
import Tbody from './Tbody';
import Thead from './Thead';

interface props {
  thead: TableHead[];
  tbody: any[];
}

const Table: React.FC<props> = ({ thead, tbody }) => {
  return (
    <table className="text-sm mx-auto mt-10 table-auto border shadow-md rounded-sm">
      <Thead thead={thead} />
      <Tbody tbody={tbody} />
    </table>
  );
};

export default Table;
