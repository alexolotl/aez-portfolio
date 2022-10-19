import React from 'react';
import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
    filter: blur(2px);
  }

  40%, 43% {
    transform: translate3d(-.1em, 0px, 0);
    filter: blur(2.5px);
  }

  70% {
    transform: translate3d(.1em, 0px, 0);
    filter: blur(2px);
  }

  90% {
    transform: translate3d(.1em,0px,0);
    filter: blur(1px);
  }
`;
const CustomLetter = styled.h2`
  font-size: 40px;
  filter: blur(2px);
  display: inline-block;
  letter-spacing: -0.08em;
`;

interface Props {
  text: string;
  onClick?: () => void;
}

export const BlobText = (props: Props) => {
  const { text, onClick } = props;
  return (
    <span
      css={{
        filter: 'contrast(20)',
        transform: 'translateZ(0)',
        background: '#fdfdfd',
        padding: '10px 30px',
        marginLeft: '-30px',
        cursor: onClick ? 'pointer' : 'initial',
        transition: 'filter .3s',
        mixBlendMode: 'multiply',
        height: 70,
        pointerEvents: onClick ? 'initial' : 'none'
      }}
      onClick={() => (onClick ? onClick() : null)}
    >
      {[...text].map((letter, i) => (
        <CustomLetter
          key={`customletter-${i}`}
          css={{
            animation: `${bounce} ${10 + i / 10.12345 + i}s ease infinite`
          }}
        >
          {`${letter}`}
        </CustomLetter>
      ))}
    </span>
  );
};
