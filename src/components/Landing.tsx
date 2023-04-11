import React, { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { MediaRenderer } from './MediaRenderer';
import '../styles/animations.css';

interface CustomLetterProps extends PropsWithChildren {
  style?: React.CSSProperties;
}

const CustomLetter: FC<CustomLetterProps> = (props) => {
  const { children, style } = props;

  return (
    <h2
      className="inline-block text-[80px] md:text-[120px] blur-[5px] md:blur-[4px] tracking-[-8px] md:tracking-[-12px]"
      style={style}
    >
      {children}
    </h2>
  );
};

interface LandingProps {
  setHasPerformedFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
  entryText: string;
  loadingAnimationStarted: boolean;
}

export const Landing = (props: LandingProps) => {
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
      className={`w-full max-h-full overflow-hidden flex items-center justify-center bg-white ${
        loadingAnimationStarted ? 'opacity-0' : 'opacity-1'
      } transition-all duration-2000`}
      style={{ filter: loadingAnimationStarted ? 'blur(5px)' : 'blur(0px)' }}
    >
      <span
        onClick={() => setHasPerformedFirstClick(true)}
        className="w-full h-full flex items-center justify-center contrast-[30] blur-0 translate-z-0 bg-white py-5 px-15 cursor-pointer transition-all duration-300"
      >
        {[...entryText].map((letter, i) => (
          <CustomLetter
            key={`customletter-${i}`}
            style={{
              animation: `squirm ${3 + i / 6.12345}s ease ${
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
    <div className="w-full h-full flex items-center justify-center flex-col">
      <p>Under Construction</p>
      <input type="text" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
      <div className="w-full h-full absolute top-0 left-0 z-10">
        <MediaRenderer mediafile={data.contentfulAsset} absolute />
      </div>
    </div>
  );
};
