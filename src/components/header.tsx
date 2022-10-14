import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { ContentType } from '../pages';

type Props = {
  siteTitle: string;
  setActiveContentType: React.Dispatch<React.SetStateAction<ContentType>>;
};

const Header = ({ siteTitle, setActiveContentType }: Props) => (
  <HeaderWrapper>
    <HeaderContainer>
      <StyledHeader>
        {/* <StyledLink to="/">{siteTitle}</StyledLink> */}
        {siteTitle}
      </StyledHeader>
      <StyledHeader
        onClick={() =>
          setActiveContentType((c) =>
            c === ContentType.WORK ? ContentType.NONE : ContentType.WORK
          )
        }
      >
        Work
      </StyledHeader>
      <StyledHeader
        onClick={() =>
          setActiveContentType((c) =>
            c === ContentType.ABOUT ? ContentType.NONE : ContentType.ABOUT
          )
        }
      >
        About
      </StyledHeader>
      <StyledHeader
        onClick={() =>
          setActiveContentType((c) =>
            c === ContentType.CONTACT ? ContentType.NONE : ContentType.CONTACT
          )
        }
      >
        Contact
      </StyledHeader>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;

const HeaderWrapper = styled.div`
  margin-bottom: '1.45rem';
  border-bottom: 1px solid #121212;
  position: sticky;
  top: 0;
  background-color: #fdfdfd;
  // z-index: 1000;
  height: 80px;
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
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;
