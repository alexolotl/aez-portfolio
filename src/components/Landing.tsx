import React from 'react';
import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const bounce = keyframes`
  // from, 20%, 53%, 80%, to {
  //   transform: translate3d(0,0,0);
  // }

  40%, 43% {
    transform: translate3d(-.04em, 0px, 0);
  }

  70% {
    transform: translate3d(.04em, 0px, 0);
  }

  90% {
    transform: translate3d(.07em,0px,0);
  }
`;

const CustomLetter = styled.h2`
  font-size: 180px;
  filter: blur(8px);
  display: inline-block;
  letter-spacing: -8px;

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
    </div>
  );
};
