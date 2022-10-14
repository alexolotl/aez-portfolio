import React from 'react';
import { ContentType, DataEdge } from '../pages';
import { HoverableRow } from './hoverableRow';

interface Props {
  edges: DataEdge[];
  mousePos: { x: number; y: number };
  selectedProjectIdx: number | null;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  activeContentType: ContentType;
  HEADER_HEIGHT: number;
}

export const ProjectsSection = (props: Props) => {
  const {
    edges,
    mousePos,
    selectedProjectIdx,
    setSelectedProjectIdx,
    activeIndex,
    setActiveIndex,
    activeContentType,
    HEADER_HEIGHT
  } = props;

  return (
    <div
      css={{
        display: 'flex',
        position: 'relative',
        alignItems: 'flex-start',
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        overflowY: 'hidden',
        borderTop: activeContentType !== ContentType.NONE ? '1px solid black' : 'none'
      }}
    >
      <div
        css={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row wrap',
          height: 'min-content',
          maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflowY: 'scroll',
          background: '#fdfdfd'
        }}
      >
        {edges.map((edge, i) => (
          <HoverableRow
            edge={edge}
            isActive={selectedProjectIdx !== null ? selectedProjectIdx === i : activeIndex === i}
            isHovered={activeIndex === i}
            isSelected={selectedProjectIdx === i}
            setActiveIndex={setActiveIndex}
            setSelectedProjectIdx={setSelectedProjectIdx}
            mousePos={mousePos}
            i={i}
            key={edge.node.id}
          />
        ))}
      </div>
      <div
        css={{
          alignSelf: 'flex-start',
          position: 'sticky',
          top: 0,
          width: selectedProjectIdx !== null ? 500 : 0,
          height: '100vh',
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
            width: 350,
            maxWidth: '100%',
            overflow: 'hidden',
            padding: 24,
            textAlign: 'left',
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexFlow: 'column nowrap'
          }}
        >
          <h4>{selectedProjectIdx !== null && edges[selectedProjectIdx].node.title}</h4>
          <p>{selectedProjectIdx !== null && edges[selectedProjectIdx].node.description}</p>
          {<a>Visit</a>}
        </div>
      </div>
    </div>
  );
};
