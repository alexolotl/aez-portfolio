import { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { useEffect } from 'react';
import { throttle } from 'lodash';
import { Layout } from '../components/layout';
import { About } from '../components/About';
import { DropdownContainer } from '../components/DropdownContainer';
import { Landing } from '../components/Landing';
// import { MediaRenderer } from '../components/MediaRenderer';
import { ProjectsSection } from '../components/ProjectsSection';
import { MobileProjects } from '../components/MobileProjects';

const HEADER_HEIGHT = 60;

export enum ContentType {
  ABOUT = 'ABOUT',
  WORK = 'WORK',
  NONE = 'NONE'
}

export type MediaFile = {
  id: number;
  title: string;
  file: {
    url: string;
    contentType: string;
    details: {
      image?: {
        width: number;
        height: number;
      };
    };
  };
};

export type DataEdge = {
  node: {
    id: number;
    description: string;
    mediafile: MediaFile;
    title: string;
  };
};

type DataProps = {
  allContentfulPortfolioItem: {
    totalCount: number;
    edges: DataEdge[];
  };
};

const IndexPage = (props: PageProps<DataProps>) => {
  const { allContentfulPortfolioItem } = props.data;

  const [activeContentType, setActiveContentType] = useState<ContentType>(ContentType.NONE);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [hasPerformedFirstClick, setHasPerformedFirstClick] = useState(false);
  const [loadingAnimationStarted, setLoadingAnimationStarted] = useState(false);
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);

  const [fadeInOpacity, setFadeInOpacity] = useState(0);

  useEffect(() => {
    if (!hasPerformedFirstClick || loadingAnimationStarted || loadingAnimationDone) return;

    setTimeout(() => {
      setLoadingAnimationDone(true);
    }, 2000);
    setLoadingAnimationStarted(true);
  }, [hasPerformedFirstClick, loadingAnimationStarted, loadingAnimationDone]);

  useEffect(() => {
    if (!setLoadingAnimationDone) return;

    setTimeout(() => setFadeInOpacity(1), 3000);
  }, [setLoadingAnimationDone]);

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const isMobile = window.innerWidth <= 1000;

  if (loadingAnimationDone) {
    if (isMobile) {
      return (
        <Layout
          setActiveContentType={setActiveContentType}
          setSelectedProjectIdx={setSelectedProjectIdx}
          HEADER_HEIGHT={HEADER_HEIGHT}
        >
          <MobileProjects
            edges={allContentfulPortfolioItem.edges}
            HEADER_HEIGHT={HEADER_HEIGHT}
            activeContentType={activeContentType}
            setActiveContentType={setActiveContentType}
          />
        </Layout>
      );
    }

    return (
      <div css={{ opacity: fadeInOpacity, transition: 'opacity 1s' }}>
        <Layout
          setActiveContentType={setActiveContentType}
          setSelectedProjectIdx={setSelectedProjectIdx}
          HEADER_HEIGHT={HEADER_HEIGHT}
        >
          <DropdownContainer
            isOpen={activeContentType === ContentType.ABOUT}
            HEADER_HEIGHT={HEADER_HEIGHT}
          >
            {/* {activeContentType === ContentType.ABOUT && ( */}
            <About />
            {/* )} */}
            {/* {activeContentType === ContentType.WORK && (
          <MediaRenderer
            edge={
              selectedProjectIdx !== null
                ? allContentfulPortfolioItem.edges[selectedProjectIdx]
                : null
            }
          /> 
        )}*/}
          </DropdownContainer>

          <ProjectsSection
            edges={allContentfulPortfolioItem.edges}
            mousePos={mousePos}
            selectedProjectIdx={selectedProjectIdx}
            setSelectedProjectIdx={setSelectedProjectIdx}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            activeContentType={activeContentType}
            setActiveContentType={setActiveContentType}
            HEADER_HEIGHT={HEADER_HEIGHT}
          />
        </Layout>
      </div>
    );
  }

  if (!loadingAnimationDone) {
    return (
      <Landing
        entryText="ENTER"
        setHasPerformedFirstClick={setHasPerformedFirstClick}
        loadingAnimationStarted={loadingAnimationStarted}
      />
    );
  }

  return null;
};

export default IndexPage;

export const query = graphql`
  {
    allContentfulPortfolioItem {
      totalCount
      edges {
        node {
          id
          description
          mediafile {
            id
            title
            file {
              url
              contentType
              details {
                image {
                  width
                  height
                }
              }
            }
          }
          title
        }
      }
    }
  }
`;
