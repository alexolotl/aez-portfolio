import { DataEdge } from '../pages';

interface Props {
  edge: DataEdge | null;
  hasBorder?: boolean;
  handleClick?: () => void;
}

export const MediaRenderer = (props: Props) => {
  const { edge, hasBorder, handleClick } = props;

  if (!edge) return null;

  return edge.node.mediafile.file.contentType.includes('video') ? (
    <video
      src={edge.node.mediafile.file.url}
      css={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        objectFit: 'cover',
        border: hasBorder ? '1px solid #121212' : 'none',
        background: 'white'
      }}
      autoPlay
      loop
      onClick={() => (handleClick ? handleClick() : null)}
    />
  ) : (
    <img
      src={edge.node.mediafile.file.url}
      css={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        objectFit: 'cover',
        border: hasBorder ? '1px solid #121212' : 'none',
        background: 'white'
      }}
      onClick={() => (handleClick ? handleClick() : null)}
    />
  );
};
