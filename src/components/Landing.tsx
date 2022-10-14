import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(-30px, 0px, 0);
  }

  70% {
    transform: translate3d(30px, 0px, 0);
  }

  90% {
    transform: translate3d(20px,0px,0);
  }
`;
const CustomLetter = styled.h2`
  font-size: 180px;
  filter: blur(10px);
  display: inline-block;
  letter-spacing: -12px;
`;

interface Props {
  setHasPerformedFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
  entryText: string;
}
export const Landing = (props: Props) => {
  const { setHasPerformedFirstClick, entryText } = props;
  return (
    <div
      css={{
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span
        onClick={() => setHasPerformedFirstClick(true)}
        css={{
          filter: 'contrast(20) blur(0px)',
          transform: 'translateZ(0)',
          background: '#fdfdfd',
          padding: '20px 60px',
          cursor: 'pointer',
          transition: 'filter .3s',
          '&:hover': {
            filter: 'contrast(20) blur(0px)'
          }
        }}
      >
        {[...entryText].map((letter, i) => (
          <CustomLetter
            key={`customletter-${i}`}
            css={{
              animation: `${bounce} ${1 + i / 10.12345}s ease infinite`
            }}
          >
            {letter}
          </CustomLetter>
        ))}
      </span>
    </div>
  );
};
