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

  const { description } =
    data.allContentfulAbout.edges[0].node.childContentfulAboutDescriptionTextNode;

  return (
    <div className="h-[500px]">
      <div className="w-full h-full relative left-0 top-0 py-4 px-6 overflow-hidden z-[1]">
        <h1
          // line height was 1.4 not 1.375
          className="w-full h-full leading-snug text-justify text-[#fdfdfd]"
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
            className="w-full h-full leading-snug text-justify text-[#fdfdfd]"
            max={200}
          >
            {description}
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
