import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';

import './layout.css';
import '../styles/global.css';
import { ContentType } from '../pages';

interface Props extends PropsWithChildren {
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  HEADER_HEIGHT: number;
}

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
          meta={[{ name: 'description', content: 'AZ Portfolio' }]}
        >
          <html lang="en" />
        </Helmet>
        <Header
          siteTitle={data.site.siteMetadata.title}
          setActiveContentType={setActiveContentType}
          setSelectedProjectIdx={setSelectedProjectIdx}
          HEADER_HEIGHT={HEADER_HEIGHT}
        />
        <div className="my-0 mx-auto max-w-screen overflow-x-hidden">{children}</div>
      </>
    )}
  />
);
