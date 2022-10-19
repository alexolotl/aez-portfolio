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
              position: absolute ? 'absolute' : 'block',
              top: 0,
              left: 0
            }}
            preload="auto"
            loop
            onClick={() => (handleClick ? handleClick() : null)}
            playsInline
            ref={videoRef}
          />
          <div>mobile placeholder...</div>
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
              zIndex: zIndex !== undefined ? zIndex : 'inherit',
              position: absolute ? 'absolute' : 'block',
              top: 0,
              left: 0
            }}
            autoPlay
            preload="auto"
            loop
            onClick={() => (handleClick ? handleClick() : null)}
            playsInline
            ref={videoRef}
          />
          <div
            css={{
              display: videoIsLoaded ? 'none' : 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* <div className="lds-spinner">
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
            </div> */}
          </div>
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
        position: absolute ? 'absolute' : 'block',
        top: 0,
        left: 0
      }}
      onClick={() => (handleClick ? handleClick() : null)}
    />
  );
};
