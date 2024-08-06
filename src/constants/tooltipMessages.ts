import { TOOLTIP_MESSAGE } from "../enums/tooltipMessage.ts";

export const TooltipMessages: Record<TOOLTIP_MESSAGE, string> = {
  [TOOLTIP_MESSAGE.INVALID_WORD]: "Введите существительное из пяти букв",
  [TOOLTIP_MESSAGE.WORD_ALREADY_USED]: "Это слово уже&nbsp;было",
  [TOOLTIP_MESSAGE.CORRECT_LETTER_POSITION]: "Вы угадали положение буквы",
  [TOOLTIP_MESSAGE.LETTER_NOT_IN_WORD]: "Этой буквы нет в&nbsp;слове",
  [TOOLTIP_MESSAGE.INCORRECT_LETTER_POSITION]: "Не угадали положение буквы",
};

export const TooltipEmojis: Record<TOOLTIP_MESSAGE, string> = {
  [TOOLTIP_MESSAGE.INVALID_WORD]: "🤓",
  [TOOLTIP_MESSAGE.WORD_ALREADY_USED]: "🤔",
  [TOOLTIP_MESSAGE.CORRECT_LETTER_POSITION]: "😊",
  [TOOLTIP_MESSAGE.LETTER_NOT_IN_WORD]: "😞",
  [TOOLTIP_MESSAGE.INCORRECT_LETTER_POSITION]: "🤔",
};
