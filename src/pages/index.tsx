import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { css } from '@emotion/css';

type Node = {
  node: {
    id: number;
    mediafile: {
      id: number;
      title: string;
      file: {
        url: string;
        contentType: string;
      };
    };
    title: string;
  };
};

type DataProps = {
  allContentfulPortfolioItem: {
    totalCount: number;
    edges: Node[];
  };
};

const header = css({
  color: '#0505'
});

const IndexPage = (props: PageProps<DataProps>) => {
  const { allContentfulPortfolioItem } = props.data;

  console.log(allContentfulPortfolioItem);

  return (
    <>
      <h1 className={header}>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
      <div
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
            css={{ border: '1px solid black', height: 0, paddingTop: '60%', position: 'relative' }}
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
      </div>
    </>
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
          mediafile {
            id
            title
            file {
              url
              contentType
            }
          }
          title
        }
      }
    }
  }
`;
