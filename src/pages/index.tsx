import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { css, keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { throttle } from 'lodash';
import { HoverableRow } from '../components/hoverableRow';
import { Layout } from '../components/layout';

const HEADER_HEIGHT = 80;

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

const header = css({
  color: '#0505'
});

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(-30px, 0px, 0);
  }

  70% {
    transform: translate3d(30px, 0px, 0);
  }

  90% {
    transform: translate3d(20px,0px,0);
  }
`
const CustomLetter = styled.h2`
  font-size: 180px;
  filter: blur(10px);
  display: inline-block;
  letter-spacing: -12px;
`;


const IndexPage = (props: PageProps<DataProps>) => {
  const { allContentfulPortfolioItem } = props.data;

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<number | null>(null);

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
    <Layout>
      {/* <h3 onClick={() => setIsAboutOpen((o) => !o)}>About</h3> */}

      <div
        css={{
          height: isAboutOpen ? 500 : 0,
          width: '100%',
          transition: 'height .5s',
          overflow: 'hidden'
        }}
      >
        <div css={{ width: 500, overflow: 'hidden', padding: 16 }}>About section</div>
      </div>

      <div
        css={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflowY: 'hidden'
        }}
      >
        {/* <Link to="/page-2/">Go to page 2</Link> */}
        {/* GRID <div
        css={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '10px'
        }}
      >
        {allContentfulPortfolioItem.edges.map((edge) => (
          <div
            key={edge.node.id}
            css={{ border: '1px solid #121212', height: 0, paddingTop: '60%', position: 'relative' }}
          >
            {edge.node.mediafile.file.contentType.includes('video') ? (
              <video
                src={edge.node.mediafile.file.url}
                css={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <img
                src={edge.node.mediafile.file.url}
                css={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        ))}
      </div> */}

        <div
          css={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
            height: 'min-content',
            maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: 'scroll'
          }}
        >
          {allContentfulPortfolioItem.edges.map((edge, i) => (
            <HoverableRow
              edge={edge}
              isActive={isDetailsOpen !== null ? isDetailsOpen === i : activeIndex === i}
              isHovered={activeIndex === i}
              isSelected={isDetailsOpen === i}
              setActiveIndex={setActiveIndex}
              setIsDetailsOpen={setIsDetailsOpen}
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
            width: isDetailsOpen !== null ? 500 : 0,
            height: '100vh',
            transition: 'width .5s',
            overflow: 'hidden',
            cursor: 'e-resize',
            backgroundImage: 'radial-gradient(#121212 0.5px, #fafafa 0.5px)',
            backgroundSize: '10px 10px'
          }}
          onClick={() => setIsDetailsOpen(null)}
        >
          <div
            css={{
              width: 350,
              maxWidth: '100%',
              overflow: 'hidden',
              padding: 24,
              textAlign: 'left',
              // borderLeft: '1px solid #121212',
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexFlow: 'column nowrap'
            }}
          >
            {/* <div
              css={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <h3 onClick={() => setIsDetailsOpen(null)} css={{ cursor: 'pointer' }}>
                {'<'}
              </h3>
            </div> */}
            <h4>
              {isDetailsOpen !== null && allContentfulPortfolioItem.edges[isDetailsOpen].node.title}
            </h4>
            <p>
              {isDetailsOpen !== null &&
                allContentfulPortfolioItem.edges[isDetailsOpen].node.description}
            </p>
            {<a>Visit -></a>}
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <div css={{
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <span onClick={() => setHasPerformedFirstClick(true)} css={{
      filter: 'contrast(20) blur(5px)', transform: 'translateZ(0)', background: '#fdfdfd', padding: '20px 60px', 
      cursor: 'pointer',
      transition: 'filter .3s',
      '&:hover': {
        filter: 'contrast(20) blur(0px)'
      }
      }}>
      <CustomLetter css={{
        animation: `${bounce} 1s ease infinite`
      }}>
        E
      </CustomLetter>
      <CustomLetter css={{
        animation: `${bounce} 1.1s ease-in-out infinite`
      }}>
        N
      </CustomLetter>
      <CustomLetter css={{
        animation: `${bounce} 1.2s ease infinite`
      }}>
        T
      </CustomLetter>
      <CustomLetter css={{
        animation: `${bounce} 1.3s ease-in-out infinite`
      }}>
        E
      </CustomLetter>
      <CustomLetter css={{
        animation: `${bounce} 1.4s ease infinite`
      }}>
        R
      </CustomLetter>
    </span>
    </div>
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
