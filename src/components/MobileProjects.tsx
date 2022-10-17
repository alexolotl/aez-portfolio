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
    <div css={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <DropdownContainer
        isOpen={activeContentType === ContentType.ABOUT}
        HEADER_HEIGHT={HEADER_HEIGHT}
        isMobile
      >
        <About />
      </DropdownContainer>

      {selectedProject !== null && (
        <div
          css={{
            padding: '16px 8px'
          }}
        >
          <div onClick={() => setSelectedProject(null)}>Back</div>
          <h2>{selectedProject.node.title}</h2>
          <h2>{selectedProject.node.description}</h2>
          <MediaRenderer mediafile={selectedProject.node.mediafile} hasBorder />
        </div>
      )}

      <div
        css={{
          padding: 8,
          paddingTop: 16,
          width: '100%',
          background: '#fdfdfd',
          zIndex: 1000,
          minHeight: '100vh'
        }}
      >
        <div
          css={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '10px'
          }}
        >
          {edges.map((edge) => (
            <div
              key={edge.node.id}
              css={{
                height: 0,
                paddingTop: '60%',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => handleClick(edge)}
            >
              <MediaRenderer mediafile={edge.node.mediafile} hasBorder absolute />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
