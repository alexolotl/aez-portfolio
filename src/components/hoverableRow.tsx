import React, { useMemo, useRef } from 'react';
import { ContentType, DataEdge } from '../pages';
import { MediaRenderer } from './MediaRenderer';

interface Props {
  edge: DataEdge;
  isActive: boolean;
  isHovered: boolean;
  isSelected: boolean;
  setActiveIndex: (n: number | null) => void;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  mousePos: { x: number; y: number };
  activeContentType: ContentType;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
  windowWidth: number;
  windowHeight: number;
  i: number;
}
export const HoverableRow = (props: Props) => {
  const {
    edge,
    isActive,
    isSelected,
    setActiveIndex,
    setSelectedProjectIdx,
    setActiveContentType,
    activeContentType,
    mousePos,
    windowWidth,
    windowHeight,
    i
  } = props;

  const mediaRef = useRef<HTMLDivElement>(null);

  const maxWidth = useMemo(() => windowWidth * 0.4, [windowWidth]);
  const maxHeight = useMemo(() => windowHeight * 0.4, [windowHeight]);
  const extraSpaceFromMouse = 16;

  const mediaFullWidth = useMemo(
    () =>
      edge.node.mediafile.file.details.image
        ? edge.node.mediafile.file.details.image.width
        : mediaRef?.current?.children?.length
        ? (mediaRef.current.children[0] as HTMLVideoElement).videoWidth
        : 0,
    [
      edge?.node?.mediafile?.file?.details?.image?.width,
      mediaRef?.current,
      mediaRef?.current?.children?.length,
      (mediaRef?.current?.children[0] as HTMLVideoElement)?.videoWidth
    ]
  );
  const mediaFullHeight = useMemo(
    () =>
      edge.node.mediafile.file.details.image
        ? edge.node.mediafile.file.details.image.height
        : mediaRef?.current?.children?.length
        ? (mediaRef.current.children[0] as HTMLVideoElement).videoHeight
        : 0,
    [
      edge?.node?.mediafile?.file?.details?.image?.height,
      mediaRef?.current,
      mediaRef?.current?.children?.length,
      (mediaRef?.current?.children[0] as HTMLVideoElement)?.videoHeight
    ]
  );

  const aspect = useMemo(
    () => (mediaFullWidth && mediaFullHeight ? mediaFullWidth / mediaFullHeight : 0),
    [mediaFullWidth, mediaFullHeight]
  );
  const widthCss = aspect < 1 ? maxHeight * aspect : maxWidth;
  const heightCss = aspect < 1 ? maxHeight : maxWidth * (1 / aspect);

  const flipYOrientation =
    mediaRef.current &&
    mousePos.y + mediaRef.current.clientHeight + extraSpaceFromMouse > windowHeight;
  const flipXOrientation =
    mediaRef.current &&
    mousePos.x + mediaRef.current.clientWidth + extraSpaceFromMouse > windowWidth;

  const hoveredXpos = flipXOrientation
    ? mousePos.x - mediaRef.current.clientWidth - extraSpaceFromMouse
    : mousePos.x + extraSpaceFromMouse;

  const hoveredYpos = flipYOrientation
    ? mousePos.y - mediaRef.current.clientHeight - extraSpaceFromMouse
    : mousePos.y + extraSpaceFromMouse;

  const xPos = isSelected ? (windowWidth - 350) / 2 - widthCss / 2 : hoveredXpos;
  const yPos = isSelected ? windowHeight / 2 - heightCss / 2 : hoveredYpos;

  const handleClick = () => {
    setSelectedProjectIdx((o) => (o !== i ? i : null));
    setActiveContentType(isSelected && ContentType.WORK ? ContentType.NONE : ContentType.WORK);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      key={edge.node.id}
      className="relative w-full cursor-pointer h-[60px] flex items-center bg-[length:10px_10px] px-4 py-0"
      style={{
        backgroundImage: isActive ? 'radial-gradient(#121212 0.5px, #fafafa 0.5px)' : ''
      }}
      onClick={handleClick}
      onMouseEnter={() => setActiveIndex(i)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <h3 className="mb-0">{edge.node.title}</h3>

      <div
        className={`fixed overflow-hidden ${isActive ? 'opacity-100' : 'opacity-0'} ${
          isActive ? 'visible' : 'invisible'
        } ${activeContentType === ContentType.NONE ? 'block' : 'hidden'} z-[1000]`}
        style={{
          left: xPos,
          top: yPos,
          width: widthCss,
          height: heightCss
        }}
        ref={mediaRef}
      >
        <MediaRenderer mediafile={edge.node.mediafile} hasBorder />
      </div>
    </div>
  );
};
