import React, { ReactNode } from 'react';

interface AppModalProps {
  value: boolean;
  children: ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ value, children }) => {
  return (
    <div
      className={`fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-[#1C1C1E]/60 px-4 ${!value ? 'hidden' : ''}`}
    >
      {children}
    </div>
  );
};

export default AppModal;
