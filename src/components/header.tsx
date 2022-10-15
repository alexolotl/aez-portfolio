import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { ContentType } from '../pages';
import { BlobText } from './BlobText';

type Props = {
  siteTitle: string;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
  setSelectedProjectIdx: React.Dispatch<React.SetStateAction<number | null>>;
  HEADER_HEIGHT: number;
};

const Header = ({
  siteTitle,
  setActiveContentType,
  setSelectedProjectIdx,
  HEADER_HEIGHT
}: Props) => (
  <HeaderWrapper css={{ height: HEADER_HEIGHT }}>
    <HeaderContainer>
      {/* <BlobText text={siteTitle.toUpperCase()} /> */}
      <StyledHeader>
        {/* <StyledLink to="/">{siteTitle}</StyledLink> */}
        {siteTitle}
      </StyledHeader>
      <StyledHeader
        onClick={() => {
          setActiveContentType((c) =>
            c === ContentType.ABOUT ? ContentType.NONE : ContentType.ABOUT
          );
          setSelectedProjectIdx(null);
        }}
      >
        About
      </StyledHeader>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;

const HeaderWrapper = styled.div`
  margin-bottom: '1.45rem';
  border-bottom: 2px solid #121212;
  position: sticky;
  top: 0;
  background-color: #fdfdfd;
  // z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
`;
const HeaderContainer = styled.div`
  // margin: 0 auto;
  // padding: 1.45rem 1.0875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledHeader = styled.h1`
  margin: 0;
  cursor: pointer;
  // text-transform: uppercase;
  filter: blur(0px);
  :hover {
    filter: blur(2px);
  }
`;

// Aeroport, FavoritPro-Regular, Perun
