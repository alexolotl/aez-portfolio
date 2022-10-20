import React from 'react';
import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { MediaRenderer } from './MediaRenderer';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(-.04em, 0.01em, 0);
  }

  70% {
    transform: translate3d(.04em, -.01em, 0);
  }

  90% {
    transform: translate3d(.07em,0em,0);
  }
`;

const CustomLetter = styled.h2`
  font-size: 120px;
  filter: blur(5px);
  display: inline-block;
  letter-spacing: -12px;

  @media (max-width: 800px) {
    font-size: 80px;
    filter: blur(4px);
    letter-spacing: -8px;
  }
`;

interface Props {
  setHasPerformedFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
  entryText: string;
  loadingAnimationStarted: boolean;
}
export const Landing = (props: Props) => {
  const { setHasPerformedFirstClick, entryText, loadingAnimationStarted } = props;
  const [enteredPassword, setEnteredPassword] = useState(true);
  const [passwordInput, setPasswordInput] = useState<string>('');

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

  useEffect(() => {
    if (!passwordInput) return;

    if (passwordInput === 'asdf123') {
      setEnteredPassword(true);
    }
  }, [passwordInput]);

  return enteredPassword ? (
    <div
      css={{
        width: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: loadingAnimationStarted ? 0 : 1,
        filter: loadingAnimationStarted ? 'blur(5px)' : 'blur(0px)',
        transition: 'opacity 2s, filter 2s',
        background: '#ffffff'
      }}
    >
      <span
        onClick={() => setHasPerformedFirstClick(true)}
        css={{
          filter: 'contrast(30) blur(0px)',
          transform: 'translateZ(0)',
          background: '#ffffff',
          padding: '20px 60px',
          cursor: 'pointer',
          transition: 'filter .3s',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          // '&:hover': {
          //   filter: 'contrast(20) blur(0px)'
          // }
        }}
      >
        {[...entryText].map((letter, i) => (
          <CustomLetter
            key={`customletter-${i}`}
            css={{
              animation: `${bounce} ${3 + i / 6.12345}s ease ${
                i % 2 === 0 ? 'reverse' : 'normal'
              } infinite`
            }}
          >
            {letter}
          </CustomLetter>
        ))}
      </span>
    </div>
  ) : (
    <div
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column nowrap'
      }}
    >
      <p>Under Construction</p>
      <input type="text" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
      <div
        css={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 10 }}
      >
        <MediaRenderer mediafile={data.contentfulAsset} absolute />
      </div>
    </div>
  );
};
