import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';

const ErrorBoundary = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  const onClickBack = useCallback(() => {
    resetErrorBoundary();
    navigate(-1);
  }, [resetErrorBoundary, navigate]);

  return (
    <div className="flex flex-col py-10 px-20 space-y-5">
      <h1 className="text-lg font-medium text-gray-800">오류이름 : {error.name}</h1>
      <span className="text-sm font-medium text-gray-500">오류내용 : {error.message}</span>
      <span className="text-sm font-medium text-gray-500">오류발생장소 : {error.stack}</span>
      <button
        className="text-pink-50 w-fit px-2 py-1 bg-pink-500 rounded-md shadow-md text-sm hover:ring-1 ring-pink-500 active:ring-0"
        onClick={onClickBack}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default ErrorBoundary;
