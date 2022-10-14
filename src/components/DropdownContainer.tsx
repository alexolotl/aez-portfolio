import React from 'react';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

export const DropdownContainer = (props: Props) => {
  const { isOpen, children } = props;

  return (
    <div
      css={{
        height: isOpen ? 500 : 0,
        width: '100%',
        transition: 'height .5s, padding .5s',
        borderBottom: '1px solid black',
        visibility: isOpen ? 'visible' : 'hidden',
        // padding: isOpen ? '16px' : '0px 16px',
        overflow: 'hidden',
        position: 'sticky',
        top: 80
      }}
    >
      {children}
    </div>
  );
};
