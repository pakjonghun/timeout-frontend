import { joinStyle } from '@utils/styleUtils';
import React, { useState } from 'react';

interface props {
  isWorking: boolean;
}

const WorkingImage: React.FC<props> = ({ isWorking }) => {
  const [isBounce, setIsBounce] = useState(true);

  return (
    <>
      {isWorking && (
        <img
          onClick={() => {
            setIsBounce((pre) => !pre);
          }}
          className={joinStyle(
            'w-32 md:w-36 lg:w-40 cursor-pointer',
            isBounce ? 'animate-[wiggle_1.5s_ease-in-out_infinite]' : '',
          )}
          src="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/de2a2e47-4d52-479e-7e58-e2a1ee267900/medium"
          alt="working"
        />
      )}
    </>
  );
};

export default WorkingImage;
