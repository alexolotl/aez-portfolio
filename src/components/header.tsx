import React from 'react';
import { ContentType } from '../pages';
import { BlobText } from './BlobText';

type Props = {
  siteTitle: string;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  HEADER_HEIGHT: number;
};

const Header = ({
  siteTitle,
  setActiveContentType,
  setSelectedProjectIdx,
  HEADER_HEIGHT
}: Props) => (
  <div
    className={`h-[${HEADER_HEIGHT}] sticky top-0 flex items-center justify-start px-4 md:px-2 bg-[#fdfdfd]
     z-[2000] mb-[1.45rem] border-b-2 border-[#121212]`}
  >
    <div className="flex items-center justify-between w-full">
      <BlobText text={siteTitle.toUpperCase()} />
      <div className="m-0 cursor-pointer">{siteTitle}</div>
      <div
        onClick={() => {
          setActiveContentType((c) =>
            c === ContentType.ABOUT ? ContentType.NONE : ContentType.ABOUT
          );
          setSelectedProjectIdx(null);
        }}
        className="w-4 h-4 bg-[#121212] cursor-pointer"
      />
    </div>
  </div>
);

export default Header;

// Aeroport, FavoritPro-Regular, Perun
