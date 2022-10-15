import React, { useMemo, useRef } from 'react';
import { ContentType, DataEdge } from '../pages';
import { MediaRenderer } from './MediaRenderer';

const maxWidth = window.innerWidth * 0.4;
const maxHeight = window.innerHeight * 0.4;
const extraSpaceFromMouse = 16;

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
  i: number;
}
export const HoverableRow = (props: Props) => {
  const {
    edge,
    isActive,
    isHovered,
    isSelected,
    setActiveIndex,
    setSelectedProjectIdx,
    setActiveContentType,
    activeContentType,
    mousePos,
    i
  } = props;

  const mediaRef = useRef<HTMLDivElement>(null);

  const mediaFullWidth = useMemo(
    () =>
      edge.node.mediafile.file.details.image
        ? edge.node.mediafile.file.details.image.width
        : mediaRef?.current?.children
        ? (mediaRef.current.children[0] as HTMLVideoElement).videoWidth
        : 0,
    [edge?.node?.mediafile?.file?.details?.image?.width, mediaRef?.current]
  );
  const mediaFullHeight = useMemo(
    () =>
      edge.node.mediafile.file.details.image
        ? edge.node.mediafile.file.details.image.height
        : mediaRef?.current?.children
        ? (mediaRef.current.children[0] as HTMLVideoElement).videoHeight
        : 0,
    [edge?.node?.mediafile?.file?.details?.image?.height, mediaRef?.current]
  );

  const aspect = useMemo(
    () => (mediaFullWidth && mediaFullHeight ? mediaFullWidth / mediaFullHeight : 0),
    [mediaFullWidth, mediaFullHeight]
  );
  const widthCss = aspect < 1 ? maxHeight * aspect : maxWidth;
  const heightCss = aspect < 1 ? maxHeight : maxWidth * (1 / aspect);

  const flipYOrientation =
    mediaRef.current &&
    mousePos.y + mediaRef.current.clientHeight + extraSpaceFromMouse > window.innerHeight;
  const flipXOrientation =
    mediaRef.current &&
    mousePos.x + mediaRef.current.clientWidth + extraSpaceFromMouse > window.innerWidth;

  if (isActive) {
    console.log(widthCss, heightCss, mediaRef?.current?.clientWidth);
    console.log(edge.node.mediafile);
  }

  const hoveredXpos = flipXOrientation
    ? mousePos.x - mediaRef.current.clientWidth - extraSpaceFromMouse
    : mousePos.x + extraSpaceFromMouse;

  const hoveredYpos = flipYOrientation
    ? mousePos.y - mediaRef.current.clientHeight - extraSpaceFromMouse
    : mousePos.y + extraSpaceFromMouse;

  const xPos = isSelected ? (window.innerWidth - 350) / 2 - widthCss / 2 : hoveredXpos;
  const yPos = isSelected ? window.innerHeight / 2 - heightCss / 2 : hoveredYpos;

  const handleClick = () => {
    setSelectedProjectIdx((o) => (o !== i ? i : null));
    setActiveContentType(isSelected && ContentType.WORK ? ContentType.NONE : ContentType.WORK);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      key={edge.node.id}
      css={{
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
        height: '60px',
        // borderBottom: '1px solid #121212',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: isActive ? 'radial-gradient(#121212 0.5px, #fafafa 0.5px)' : '',
        backgroundSize: '10px 10px',
        padding: '0 16px'
      }}
      onClick={handleClick}
      onMouseEnter={() => setActiveIndex(i)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <h2
        css={{
          marginBottom: 0
        }}
      >
        {edge.node.title}
      </h2>

      <div
        css={{
          position: 'fixed',
          left: xPos,
          top: yPos,
          width: widthCss,
          height: heightCss,
          overflow: 'hidden',
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden',
          boxShadow: '10px 10px 20px #555555',
          zIndex: 1000,
          display: activeContentType !== ContentType.NONE ? 'none' : 'block'
        }}
        ref={mediaRef}
      >
        <MediaRenderer mediafile={edge.node.mediafile} hasBorder />
      </div>
    </div>
  );
};
