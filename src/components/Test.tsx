import React, { useEffect, useState } from 'react';

const Test = () => {
  const a = 1;
  const b = 1;
  const [k, setK] = useState('');
  useEffect(() => {
    console.log(a, b, k);
    setK('a');
  }, [k]);
  return <div className="bg-red-500 h-screen"></div>;
};

export default Test;
