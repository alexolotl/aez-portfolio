import React from 'react';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  HEADER_HEIGHT: number;
  isMobile?: boolean;
}

export const DropdownContainer = (props: Props) => {
  const { isOpen, HEADER_HEIGHT, children, isMobile } = props;

  return (
    <div
      css={{
        height: isOpen ? 500 : 0,
        width: '100%',
        transition: 'height .5s, padding .5s',
        overflow: 'hidden',
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 0 : HEADER_HEIGHT
      }}
    >
      {children}
    </div>
  );
};
