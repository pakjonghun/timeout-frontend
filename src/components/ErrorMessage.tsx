import React from 'react';
import { joinStyle } from '@utils/styleUtils';

interface props {
  errorMessage: string | undefined;
  classes?: string;
}

const ErrorMessage: React.FC<props> = ({ classes, errorMessage }) => {
  if (!errorMessage) return null;
  return (
    <small className={joinStyle('text-red-500 font-medium text-sm', classes ? classes : '')}>{errorMessage}</small>
  );
};

export default ErrorMessage;
