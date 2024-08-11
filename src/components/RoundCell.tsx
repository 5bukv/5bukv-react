import React from 'react';

import { LetterStatus } from '../enums/letterStatus.ts';

interface RoundCellProps {
  letter: string;
  status: LetterStatus;
  rowIndex: number;
  cellIndex: number;
  onClick: (payload: { status: LetterStatus; rowIndex: number; cellIndex: number }) => void;
  children?: React.ReactNode;
}

const RoundCell: React.FC<RoundCellProps> = ({
  letter,
  status,
  rowIndex,
  cellIndex,
  onClick,
  children
}) => {
  const handleClick = () => {
    if (status === LetterStatus.DEFAULT) return;
    onClick({ status, rowIndex, cellIndex });
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex aspect-[0.92/1] max-w-[calc((100%_-_24px)_/_5)] flex-grow select-none items-center justify-center rounded-md border text-3xl leading-[62px] sm:text-xl ${status === LetterStatus.DEFAULT ? 'border-[#ffdd2d]' : ''} ${status === LetterStatus.NOT_IN_WORD ? 'border-[#5f5f5f] bg-[#5f5f5f]' : ''} ${status === LetterStatus.WRONG_PLACE ? 'border-white bg-white text-black' : ''} ${status === LetterStatus.CORRECT ? 'border-[#ffdd2d] bg-[#ffdd2d] text-black' : ''} `}
    >
      {letter}
      {children && <>{children}</>}
    </div>
  );
};

export default RoundCell;
