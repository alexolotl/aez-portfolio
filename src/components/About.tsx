import React from 'react';
import { MediaRenderer } from './MediaRenderer';
import { useStaticQuery, graphql } from 'gatsby';
import { Textfit } from 'react-textfit';

export const About = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulAsset(contentful_id: { eq: "4qfgNASudpl6ganJ2ZQIpQ" }) {
        id
        title
        file {
          contentType
          url
        }
      }
      allContentfulAbout {
        edges {
          node {
            description {
              description
            }
            background {
              file {
                contentType
                url
              }
              title
            }
            childContentfulAboutDescriptionTextNode {
              description
            }
          }
        }
      }
    }
  `);

  return (
    <div css={{ height: '500px' }}>
      <div
        css={{
          zIndex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
          left: 0,
          top: 0,
          padding: '16px 24px',
          overflow: 'hidden'
        }}
      >
        <h1
          css={{
            color: '#fdfdfd',
            lineHeight: 1.4,
            height: '100%',
            width: '100%',
            textAlign: 'justify'
          }}
        >
          <Textfit
            mode="multi"
            css={{
              color: '#fdfdfd',
              lineHeight: 1.4,
              height: '100%',
              width: '100%',
              textAlign: 'justify'
            }}
            max={200}
          >
            {
              data.allContentfulAbout.edges[0].node.childContentfulAboutDescriptionTextNode
                .description
            }
            {' / my first initial + my last name + 219 at gmail'}
          </Textfit>
        </h1>
      </div>
      <div
        css={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: '#12121222'
        }}
      >
        <MediaRenderer mediafile={data.contentfulAsset} zIndex={0} />
      </div>
    </div>
  );
};
