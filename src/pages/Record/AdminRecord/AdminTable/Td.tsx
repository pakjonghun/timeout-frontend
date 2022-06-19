import { joinStyle } from '@utils/styleUtils';
import React from 'react';

interface props {
  content: string | React.ReactNode;
  classes?: string;
}

const Td: React.FC<props> = ({ content, classes }) => {
  return <td className={joinStyle('text-center py-3', classes ? classes : '')}>{content}</td>;
};

export default Td;
