import React from 'react';
import { StickerCategory, stickerCategory } from '@models/stickerCategory';
import { joinStyle } from '@utils/styleUtils';
import { WorkerCards, workerCards } from '@models/admin';

interface props {
  title: StickerCategory;
  classes?: string;
  index?: WorkerCards;
}

const Sticker: React.FC<props> = ({ classes, title, index }) => {
  return (
    <div
      className={joinStyle(
        'rounded-full first-letter:uppercase font-medium',
        stickerCategory[title].bgColor,
        stickerCategory[title].textColor,
        classes ? classes : '',
        index ? workerCards[index].stickerBgColor : '',
      )}
    >
      {title.toUpperCase()}
    </div>
  );
};

export default Sticker;
