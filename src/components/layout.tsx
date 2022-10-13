import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import Header from './header';

import './layout.css';
import './global.css';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container style={{}}>{children}</Container>
      </>
    )}
  />
);

const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
`;
