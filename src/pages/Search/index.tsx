import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import MainLayout from '@components/MainLayout';

const Search = () => {
  return (
    <MainLayout title="Search">
      <article className="py-5 px-10 space-y-5 md:px-28 xl:px-40">
        <SearchForm />
        <h1 className="text-gray-500 font-medium">검색결과 00건</h1>
        <SearchResults />
      </article>
    </MainLayout>
  );
};

export default Search;
