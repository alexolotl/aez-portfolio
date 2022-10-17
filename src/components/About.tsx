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
    }
  `);

  return (
    <div css={{ height: '100%' }}>
      <div
        css={{
          zIndex: 1,
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          padding: '16px 24px',
          overflow: 'hidden'
        }}
      >
        <h2 css={{ color: '#fdfdfd', fontSize: '3rem', lineHeight: 1.4, textAlign: 'justify' }}>
          Software Engineer / Frontend Developer with an interest in design and visual culture. I
          work mostly on web apps in Typescript, React, Agile Environments, but also enjoy WebGL,
          OpenFrameworks, and creative computation / example@email.com / New York, NY
        </h2>
      </div>
      <div
        css={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
        <MediaRenderer mediafile={data.contentfulAsset} zIndex={0} />
      </div>
    </div>
  );
};
