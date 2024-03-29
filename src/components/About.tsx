import React from 'react';
import { MediaRenderer } from './MediaRenderer';
import { useStaticQuery, graphql } from 'gatsby';

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
        <h1 className="w-full h-full leading- text-justify text-[#fdfdfd] text-2xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
          {description}
        </h1>
      </div>
      <div className="w-full h-full absolute left-0 top-0 z-0 bg-[#12121222]">
        <MediaRenderer mediafile={data.contentfulAsset} zIndex={0} />
      </div>
    </div>
  );
};
