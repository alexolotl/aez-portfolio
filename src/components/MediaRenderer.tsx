import React, { useEffect, useRef, useState } from 'react';
import { MediaFile } from '../pages';

interface Props {
  mediafile?: MediaFile;
  hasBorder?: boolean;
  handleClick?: () => void;
  contain?: boolean;
  zIndex?: number;
  absolute?: boolean;
  noPlay?: boolean;
}

export const MediaRenderer = (props: Props) => {
  const { mediafile, hasBorder, handleClick, contain, zIndex, absolute, noPlay } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  // TODO not quite reliable as to video load status
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  useEffect(() => {
    if (!videoRef || !videoRef.current) return;

    const vidref = videoRef.current;
    const handleIsReady = () => {
      setVideoIsLoaded(true);
      vidref.play();
    };

    const handleIsAlreadyPlaying = () => {
      setVideoIsLoaded(true);
    };

    vidref.addEventListener('loadeddata', handleIsReady);
    vidref.addEventListener('play', handleIsAlreadyPlaying);

    return () => {
      vidref.removeEventListener('loadeddata', handleIsReady);
      vidref.removeEventListener('play', handleIsAlreadyPlaying);
    };
  }, [videoRef]);

  if (!mediafile) return null;

  return mediafile.file.contentType.includes('video') ? (
    <>
      {noPlay ? (
        <>
          <video
            src={mediafile.file.url}
            css={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: contain ? 'contain' : 'cover',
              border: hasBorder ? '1px solid #121212' : 'none',
              zIndex: zIndex !== undefined ? zIndex : 'inherit',
              position: absolute ? 'absolute' : 'relative',
              top: 0,
              left: 0
            }}
            preload="auto"
            loop
            onClick={() => (handleClick ? handleClick() : null)}
            playsInline
            ref={videoRef}
          />
        </>
      ) : (
        <>
          <video
            src={mediafile.file.url}
            css={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: contain ? 'contain' : 'cover',
              border: hasBorder ? '1px solid #121212' : 'none',
              zIndex: 1,
              background: 'transparent'
            }}
            autoPlay
            preload="auto"
            loop
            onClick={() => (handleClick ? handleClick() : null)}
            playsInline
            ref={videoRef}
          />

          {/* TODO spinner behind element on mobile <div
            css={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: -1,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div> */}
        </>
      )}
    </>
  ) : (
    <img
      src={mediafile.file.url}
      css={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        objectFit: contain ? 'contain' : 'cover',
        border: hasBorder ? '1px solid #121212' : 'none',
        zIndex: zIndex !== undefined ? zIndex : 'inherit',
        position: absolute ? 'absolute' : 'relative',
        top: 0,
        left: 0
      }}
      onClick={() => (handleClick ? handleClick() : null)}
    />
  );
};
