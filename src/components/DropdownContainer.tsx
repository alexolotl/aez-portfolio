import React from 'react';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  HEADER_HEIGHT: number;
  isMobile?: boolean;
  marginBottom?: number;
}

export const DropdownContainer = (props: Props) => {
  const { isOpen, children, isMobile, marginBottom } = props;

  return (
    <div
      css={{
        height: isOpen ? 500 : 0,
        width: '100%',
        transition: 'height .5s, padding .5s',
        overflow: 'hidden',
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        marginBottom: marginBottom && isOpen ? marginBottom : 'initial'
      }}
    >
      {children}
    </div>
  );
};
