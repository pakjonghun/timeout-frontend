import { TableHead } from '@models/tables';
import React from 'react';

interface props {
  thead: TableHead[];
}

const Thead: React.FC<props> = ({ thead }) => {
  return (
    <thead className="text-gray-500 font-medium bg-gray-100">
      <tr className="border-b-1">
        {thead.map(({ id, title }) => (
          <th key={id} className="py-2 px-5">
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
