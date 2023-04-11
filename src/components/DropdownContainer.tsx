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
      className="w-full top-0 overflow-hidden transition-all duration-500"
      style={{
        height: isOpen ? 500 : 0,
        marginBottom: marginBottom && isOpen ? marginBottom : 'initial',
        position: isMobile ? 'relative' : 'sticky'
      }}
    >
      {children}
    </div>
  );
};
