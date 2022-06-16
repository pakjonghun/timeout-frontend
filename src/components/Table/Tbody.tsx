import React from 'react';

interface props {
  tbody: any[];
}

const Tbody: React.FC<props> = ({ tbody }) => {
  return (
    <tbody className="divide-y divide-gray-300 hover:bg-gray-50">
      <tr className="whitespace-nowrap">
        {tbody.map((v, i) => (
          <td key={i} className="py-3 px-5 text-gray-800">
            asdffsda
          </td>
        ))}
      </tr>
    </tbody>
  );
};

export default Tbody;
