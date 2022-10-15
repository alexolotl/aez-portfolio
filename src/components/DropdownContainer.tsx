import React from 'react';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  HEADER_HEIGHT: number;
}

export const DropdownContainer = (props: Props) => {
  const { isOpen, HEADER_HEIGHT, children } = props;

  return (
    <div
      css={{
        height: isOpen ? 500 : 0,
        width: '100%',
        transition: 'height .5s, padding .5s',
        overflow: 'hidden',
        position: 'sticky',
        top: HEADER_HEIGHT
      }}
    >
      {children}
    </div>
  );
};
