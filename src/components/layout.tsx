import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import Header from './header';

import './layout.css';
import './global.css';
import { ContentType } from '../pages';

type Props = {
  children: React.ReactNode;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  HEADER_HEIGHT: number;
};

export const Layout = ({
  children,
  setActiveContentType,
  setSelectedProjectIdx,
  HEADER_HEIGHT
}: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header
          siteTitle={data.site.siteMetadata.title}
          setActiveContentType={setActiveContentType}
          setSelectedProjectIdx={setSelectedProjectIdx}
          HEADER_HEIGHT={HEADER_HEIGHT}
        />
        <Container style={{}}>{children}</Container>
      </>
    )}
  />
);

const Container = styled.div`
  margin: 0 auto;
  // padding: 1rem;
`;
