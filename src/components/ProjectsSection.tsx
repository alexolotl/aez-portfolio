import { throttle } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ContentType, DataEdge } from '../pages';
import { HoverableRow } from './hoverableRow';
import { SelectedProject } from './SelectedProject';

interface Props {
  edges: DataEdge[];
  mousePos: { x: number; y: number };
  selectedProjectIdx: number | null;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  activeContentType: ContentType;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
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
    setActiveContentType,
    HEADER_HEIGHT
  } = props;

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const handleSetWindowSize = throttle(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }, 100);

    if (!windowWidth || !windowHeight) {
      handleSetWindowSize();
    }
    window.addEventListener('resize', handleSetWindowSize);

    return () => {
      window.removeEventListener('resize', handleSetWindowSize);
    };
  }, [windowWidth, windowHeight]);

  return (
    <div
      className="relative flex items-start overflow-y-hidden"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        borderTop: activeContentType === ContentType.ABOUT ? '2px solid black' : 'none',
        top: activeContentType === ContentType.ABOUT ? '-2px' : 0
      }}
    >
      <div
        className="w-full h-min flex flex-wrap bg-[#fdfdfd] overflow-y-scroll"
        style={{
          maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`
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
            activeContentType={activeContentType}
            setActiveContentType={setActiveContentType}
            mousePos={mousePos}
            i={i}
            key={edge.node.id}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
          />
        ))}
      </div>
      <SelectedProject
        selectedProjectIdx={selectedProjectIdx}
        setSelectedProjectIdx={setSelectedProjectIdx}
        edge={selectedProjectIdx !== null ? edges[selectedProjectIdx] : null}
        HEADER_HEIGHT={HEADER_HEIGHT}
      />
    </div>
  );
};
