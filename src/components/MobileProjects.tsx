import React, { useCallback, useState } from 'react';
import { ContentType, DataEdge } from '../pages';
import { About } from './About';
import { DropdownContainer } from './DropdownContainer';
import { MediaRenderer } from './MediaRenderer';

interface Props {
  edges: DataEdge[];
  activeContentType: ContentType;
  HEADER_HEIGHT: number;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
}

export const MobileProjects = (props: Props) => {
  const { edges, activeContentType, setActiveContentType, HEADER_HEIGHT } = props;

  const [selectedProject, setSelectedProject] = useState<DataEdge | null>(null);

  const handleClick = useCallback((edge: DataEdge) => {
    setSelectedProject((s) => (!s || s.node.id !== edge.node.id ? edge : null));
    setActiveContentType(ContentType.NONE);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <DropdownContainer
        isOpen={activeContentType === ContentType.ABOUT}
        HEADER_HEIGHT={HEADER_HEIGHT}
        isMobile
        marginBottom={16}
      >
        <About />
      </DropdownContainer>

      {selectedProject !== null && (
        <div className="py-4 px-2">
          <div className="w-[40px] h-[20px]" onClick={() => setSelectedProject(null)}>
            Back
          </div>
          <br />
          <h2>{selectedProject.node.title}</h2>
          <p>{selectedProject.node.description}</p>
          <MediaRenderer mediafile={selectedProject.node.mediafile} hasBorder />
        </div>
      )}

      <div className="w-full max-w-full min-h-[100vh] p-2 pt-0 bg-[#fdfdfd] z-[1000]">
        <div className="w-full grid gap-4 grid-cols-2">
          {edges.map((edge) => (
            <div
              key={edge.node.id}
              className="h-0 pt-[60%] relative cursor-pointer"
              onClick={() => handleClick(edge)}
            >
              <MediaRenderer
                mediafile={edge.node.thumb ? edge.node.thumb : edge.node.mediafile}
                hasBorder
                absolute
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
