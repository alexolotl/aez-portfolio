import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

type Props = {
  siteTitle: string;
};

const Header = ({ siteTitle }: Props) => (
  <HeaderWrapper>
    <HeaderContainer>
      <StyledHeader>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </StyledHeader>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;

const HeaderWrapper = styled.div`
  margin-bottom: '1.45rem';
  border-bottom: 1px solid black;
`;
const HeaderContainer = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`;
const StyledHeader = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;
