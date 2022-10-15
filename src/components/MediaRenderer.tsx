import { MediaFile } from '../pages';

interface Props {
  mediafile?: MediaFile;
  hasBorder?: boolean;
  handleClick?: () => void;
  contain?: boolean;
  zIndex?: number;
}

export const MediaRenderer = (props: Props) => {
  const { mediafile, hasBorder, handleClick, contain, zIndex } = props;

  if (!mediafile) return null;

  return mediafile.file.contentType.includes('video') ? (
    <video
      src={mediafile.file.url}
      css={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        objectFit: contain ? 'contain' : 'cover',
        border: hasBorder ? '1px solid #121212' : 'none',
        zIndex: zIndex !== undefined ? zIndex : 'inherit'
      }}
      autoPlay
      loop
      onClick={() => (handleClick ? handleClick() : null)}
    />
  ) : (
    <img
      src={mediafile.file.url}
      css={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        objectFit: contain ? 'contain' : 'cover',
        border: hasBorder ? '1px solid #121212' : 'none',
        zIndex: zIndex !== undefined ? zIndex : 'inherit'
      }}
      onClick={() => (handleClick ? handleClick() : null)}
    />
  );
};
