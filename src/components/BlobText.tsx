import React, { FC, PropsWithChildren } from 'react';
import '../styles/animations.css';

interface CustomLetterProps extends PropsWithChildren {
  style?: React.CSSProperties;
}

const CustomLetter: FC<CustomLetterProps> = (props) => {
  const { children, style } = props;

  return (
    <h2 className="inline-block text-[40px] blur-[2px] tracking-[-0.08em]" style={style}>
      {children}
    </h2>
  );
};

interface Props {
  text: string;
  onClick?: () => void;
}

export const BlobText = (props: Props) => {
  const { text, onClick } = props;
  return (
    <span
      className="h-[60px] -ml-8 py-5 px-8 contrast-[20] transition-[filter] transition-300 translate-z-[0px] bg-[#fdfdfd] mix-blend-multiply"
      style={{
        pointerEvents: onClick ? 'initial' : 'none',
        cursor: onClick ? 'pointer' : 'initial'
      }}
      onClick={() => (onClick ? onClick() : null)}
    >
      {[...text].map((letter, i) => (
        <CustomLetter
          key={`customletter-${i}`}
          style={{
            animation: `bounce ${10 + i / 10.12345 + i}s ease infinite`
          }}
        >
          {`${letter}`}
        </CustomLetter>
      ))}
    </span>
  );
};
