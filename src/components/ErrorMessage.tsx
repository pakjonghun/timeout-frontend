import React from 'react';

interface props {
  errorMessage: string | undefined;
}

const ErrorMessage: React.FC<props> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <small className="text-red-500 font-medium text-sm">{errorMessage}</small>;
};

export default ErrorMessage;
