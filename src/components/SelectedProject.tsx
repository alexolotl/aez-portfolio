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
      className="flex-[1_0_auto] self-start sticky top-0 transition-width duration-500 ease-in-out overflow-hidden cursor-e-resize"
      style={{
        width: selectedProjectIdx !== null ? 400 : 0,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        backgroundImage: 'radial-gradient(#121212 0.5px, #fafafa 0.5px)',
        backgroundSize: '10px 10px'
      }}
      onClick={() => setSelectedProjectIdx(null)}
    >
      <div
        className="flex items-start justify-space-between flex-col w-[400px] overflow-x-hidden overflow-y-scroll p-6 text-left"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`
        }}
      >
        <div>
          <h3 className="uppercase">{!!edge && edge.node.title}</h3>
          {!!edge && edge.node.description && <p>{!!edge && edge.node.description}</p>}
        </div>

        <div className="w-full max-h-[40vh]">
          <MediaRenderer mediafile={edge ? edge.node.mediafile : undefined} contain />
        </div>

        {edge && edge.node.supportingMediafiles
          ? edge.node.supportingMediafiles.map((mediaFile) => (
              <div className="w-full max-h-[40vh]" key={mediaFile.id}>
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
