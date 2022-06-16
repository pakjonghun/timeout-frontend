import React from 'react';
import { userSearchCategory } from '@models/search';

const SearchResults = () => {
  return (
    <>
      {userSearchCategory.map(({ id, title }) => (
        <ul key={id} className="divide-y-[1px]">
          <li className="py-2 font-medium text-sm text-gray-500">{title}</li>
          <li className="py-2 text-sm text-gray-800">검색결과</li>
          <li className="py-2 font-medium text-sm text-gray-500">더보기</li>
        </ul>
      ))}
    </>
  );
};

export default SearchResults;
