import React from 'react';

import { BUTTON_APPLY, BUTTON_DELETE } from '../constants/buttons';
import { KeyboardType } from '../enums/keyboardType';
import { LetterStatus } from '../enums/letterStatus';
import { KeyboardButton } from '../types/KeyboardButton';

interface KeyboardKeyProps {
  keyboardButton: KeyboardButton;
  onInput: (symbol: string) => void;
  onDelete: () => void;
  onApply: () => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  keyboardButton,
  onInput,
  onDelete,
  onApply
}) => {
  const handleKeyClick = () => {
    if (keyboardButton.type === KeyboardType.LETTER) {
      onInput(keyboardButton.symbol);
    } else if (keyboardButton.symbol === BUTTON_DELETE) {
      onDelete();
    } else if (keyboardButton.symbol === BUTTON_APPLY) {
      onApply();
    }
  };

  if (keyboardButton.symbol === BUTTON_DELETE) {
    return (
      <button
        onClick={handleKeyClick}
        className="mb-6 mr-2 h-10 w-8 select-none rounded-md border border-gray-900 border-white/25 p-0 sm:aspect-[0.88_/_1] sm:h-[60px] sm:w-auto"
        key={keyboardButton.symbol}
      >
        ⌫
      </button>
    );
  }

  if (keyboardButton.symbol === BUTTON_APPLY) {
    return (
      <button
        onClick={handleKeyClick}
        className="mb-6 mr-2 h-10 w-8 select-none rounded-md border border-gray-900 border-white/25 p-0 sm:aspect-[0.88_/_1] sm:h-[60px] sm:w-auto"
        key={keyboardButton.symbol}
      >
        ⏎
      </button>
    );
  }

  return (
    <button
      onClick={handleKeyClick}
      className={`h-10 w-8 select-none rounded-md border p-0 font-semibold sm:aspect-[0.88_/_1] sm:h-[60px] sm:w-auto ${keyboardButton.status === LetterStatus.DEFAULT ? 'border-white/25' : ''} ${keyboardButton.status === LetterStatus.CORRECT ? 'border-[#ffdd2d] bg-[#ffdd2d] text-black' : ''} ${keyboardButton.status === LetterStatus.WRONG_PLACE ? 'border-white bg-white text-black' : ''} ${keyboardButton.status === LetterStatus.NOT_IN_WORD ? 'border-[#5f5f5f] bg-[#5f5f5f] text-white' : ''} `}
      key={keyboardButton.symbol}
    >
      {keyboardButton.symbol}
    </button>
  );
};

export default KeyboardKey;
