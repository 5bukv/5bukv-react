import { useCallback, useState } from 'react';

import { BUTTON_APPLY, BUTTON_DELETE } from '../constants/buttons.ts';
import { KeyboardType } from '../enums/keyboardType.ts';
import { LetterStatus } from '../enums/letterStatus.ts';
import { KeyboardButton } from '../types/KeyboardButton';

const createLetterButton = (symbol: string): KeyboardButton => ({
  symbol,
  type: KeyboardType.LETTER,
  status: LetterStatus.DEFAULT
});

const createServiceButton = (symbol: string): KeyboardButton => ({
  symbol,
  type: KeyboardType.SERVICE,
  status: null
});

const initialButtons: KeyboardButton[][] = [
  [
    createLetterButton('Й'),
    createLetterButton('Ц'),
    createLetterButton('У'),
    createLetterButton('К'),
    createLetterButton('Е'),
    createLetterButton('Н'),
    createLetterButton('Г'),
    createLetterButton('Ш'),
    createLetterButton('Щ'),
    createLetterButton('З'),
    createLetterButton('Х'),
    createLetterButton('Ъ')
  ],
  [
    createLetterButton('Ф'),
    createLetterButton('Ы'),
    createLetterButton('В'),
    createLetterButton('А'),
    createLetterButton('П'),
    createLetterButton('Р'),
    createLetterButton('О'),
    createLetterButton('Л'),
    createLetterButton('Д'),
    createLetterButton('Ж'),
    createLetterButton('Э')
  ],
  [
    createServiceButton(BUTTON_APPLY),
    createLetterButton('Я'),
    createLetterButton('Ч'),
    createLetterButton('С'),
    createLetterButton('М'),
    createLetterButton('И'),
    createLetterButton('Т'),
    createLetterButton('Ь'),
    createLetterButton('Б'),
    createLetterButton('Ю'),
    createServiceButton(BUTTON_DELETE)
  ]
];

function shouldUpdateStatus(currentStatus: LetterStatus | null, newStatus: LetterStatus): boolean {
  if (newStatus === LetterStatus.CORRECT) return true;
  if (newStatus === LetterStatus.WRONG_PLACE && currentStatus !== LetterStatus.CORRECT) return true;
  return newStatus === LetterStatus.NOT_IN_WORD && currentStatus === LetterStatus.DEFAULT;
}

function updateButton(button: KeyboardButton, newStatus: LetterStatus) {
  if (button.type === KeyboardType.LETTER && shouldUpdateStatus(button.status, newStatus)) {
    button.status = newStatus;
  }
}

const useButtons = () => {
  const [buttons, setButtons] = useState<KeyboardButton[][]>(initialButtons);

  const updateButtonStatus = useCallback((symbol: string, newStatus: LetterStatus) => {
    setButtons((prevButtons) =>
      prevButtons.map((row) =>
        row.map((button) => {
          if (button.symbol === symbol) {
            const updatedButton = { ...button };
            updateButton(updatedButton, newStatus);
            return updatedButton;
          }
          return button;
        })
      )
    );
  }, []);

  const resetButtons = useCallback(() => {
    setButtons(initialButtons.map((row) => row.map((button) => ({ ...button }))));
  }, []);

  return { buttons, updateButtonStatus, resetButtons };
};

export default useButtons;
