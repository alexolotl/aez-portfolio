import React from 'react';
import { DataEdge } from '../pages';
import { MediaRenderer } from './MediaRenderer';

interface Props {
  edge: DataEdge | null;
  selectedProjectIdx: number | null;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  HEADER_HEIGHT: number;
}

export const SelectedProject = (props: Props) => {
  const { edge, selectedProjectIdx, setSelectedProjectIdx, HEADER_HEIGHT } = props;

  return (
    <div
      css={{
        flex: '1 0 auto',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 0,
        width: selectedProjectIdx !== null ? 400 : 0,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        transition: 'width .5s',
        overflow: 'hidden',
        cursor: 'e-resize',
        backgroundImage: 'radial-gradient(#121212 0.5px, #fafafa 0.5px)',
        backgroundSize: '10px 10px'
      }}
      onClick={() => setSelectedProjectIdx(null)}
    >
      <div
        css={{
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: 24,
          textAlign: 'left',
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexFlow: 'column nowrap',
          width: 400
        }}
      >
        <div>
          <h3 css={{ textTransform: 'uppercase' }}>{!!edge && edge.node.title}</h3>
          {!!edge && edge.node.description && <p>{!!edge && edge.node.description}</p>}
        </div>

        <div css={{ width: '100%', maxHeight: '40vh' }}>
          <MediaRenderer mediafile={edge ? edge.node.mediafile : undefined} contain />
        </div>

        {edge && edge.node.supportingMediafiles
          ? edge.node.supportingMediafiles.map((mediaFile) => (
              <div css={{ width: '100%', maxHeight: '40vh' }} key={mediaFile.id}>
                <MediaRenderer mediafile={mediaFile} contain />
              </div>
            ))
          : null}

        <a href={edge && edge.node.link ? edge.node.link : ''} rel="noreferrer" target="_blank">
          {edge && edge.node.link ? 'Visit' : ''}
        </a>
      </div>
    </div>
  );
};
