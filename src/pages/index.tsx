import { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { css } from '@emotion/css';
import { useEffect } from 'react';
import { throttle } from 'lodash';
import { Layout } from '../components/layout';
import { About } from '../components/About';
import { DropdownContainer } from '../components/DropdownContainer';
import { Contact } from '../components/Contact';
import { Landing } from '../components/Landing';
import { MediaRenderer } from '../components/MediaRenderer';
import { ProjectsSection } from '../components/ProjectsSection';

const HEADER_HEIGHT = 80;

export enum ContentType {
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  WORK = 'WORK',
  NONE = 'NONE'
}

export type DataEdge = {
  node: {
    id: number;
    description: string;
    mediafile: {
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

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return hasPerformedFirstClick ? (
    <Layout setActiveContentType={setActiveContentType}>
      <DropdownContainer isOpen={activeContentType !== ContentType.NONE}>
        {activeContentType === ContentType.ABOUT && <About />}
        {activeContentType === ContentType.CONTACT && <Contact />}
        {activeContentType === ContentType.WORK && (
          <MediaRenderer
            edge={
              selectedProjectIdx !== null
                ? allContentfulPortfolioItem.edges[selectedProjectIdx]
                : null
            }
          />
        )}
      </DropdownContainer>

      <ProjectsSection
        edges={allContentfulPortfolioItem.edges}
        mousePos={mousePos}
        selectedProjectIdx={selectedProjectIdx}
        setSelectedProjectIdx={setSelectedProjectIdx}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        activeContentType={activeContentType}
        HEADER_HEIGHT={HEADER_HEIGHT}
      />
    </Layout>
  ) : (
    <Landing entryText="WELCOME" setHasPerformedFirstClick={setHasPerformedFirstClick} />
  );
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

// {
//   /* <Link to="/page-2/">Go to page 2</Link> */
// }
// {
//   /* GRID <div
//         css={{
//           width: '100%',
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr 1fr',
//           gridGap: '10px'
//         }}
//       >
//         {allContentfulPortfolioItem.edges.map((edge) => (
//           <div
//             key={edge.node.id}
//             css={{ border: '1px solid #121212', height: 0, paddingTop: '60%', position: 'relative' }}
//           >
//             {edge.node.mediafile.file.contentType.includes('video') ? (
//               <video
//                 src={edge.node.mediafile.file.url}
//                 css={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   maxWidth: '100%',
//                   objectFit: 'cover'
//                 }}
//               />
//             ) : (
//               <img
//                 src={edge.node.mediafile.file.url}
//                 css={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   maxWidth: '100%',
//                   objectFit: 'cover'
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div> */
// }
