import React, { useMemo, useRef } from 'react';
import { DataEdge } from '../pages';

const maxWidth = window.innerWidth / 2;
const maxHeight = window.innerHeight * 0.6;
const extraSpaceFromMouse = 16;

interface Props {
  edge: DataEdge;
  isActive: boolean;
  isHovered: boolean;
  isSelected: boolean;
  setActiveIndex: (n: number | null) => void;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<number | null>>;
  mousePos: { x: number; y: number };
  i: number;
}
export const HoverableRow = (props: Props) => {
  const { edge, isActive, isHovered, isSelected, setActiveIndex, setIsDetailsOpen, mousePos, i } =
    props;

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
    () => (mediaRef.current ? mediaFullWidth / mediaFullHeight : 0),
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
  return (
    <div
      key={edge.node.id}
      css={{
        position: 'relative',
        width: '100%',
        cursor: 'crosshair',
        height: '60px',
        // borderBottom: '1px solid #121212',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: isActive ? 'radial-gradient(#121212 0.5px, #fafafa 0.5px)' : '',
        backgroundSize: '10px 10px',
        padding: '0 16px'
      }}
      onClick={() => setIsDetailsOpen((o) => (o !== i ? i : null))}
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
          zIndex: 1000
        }}
        ref={mediaRef}
      >
        {edge.node.mediafile.file.contentType.includes('video') ? (
          <video
            src={edge.node.mediafile.file.url}
            css={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              border: '1px solid #121212',
              background: 'white'
            }}
            autoPlay
            loop
          />
        ) : (
          <img
            src={edge.node.mediafile.file.url}
            css={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
              border: '1px solid #121212',
              background: 'white',
              zIndex: isSelected ? 0 : 1000
            }}
          />
        )}
      </div>
    </div>
  );
};
