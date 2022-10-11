import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { css } from '@emotion/css';

import { Layout } from '../components/layout';

type DataProps = {
  allContentfulPortfolioItem: {
    totalCount: number;
    edges: {
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
