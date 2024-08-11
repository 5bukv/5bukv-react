import type { KeyboardType } from '@/enums/keyboardType';
import { LetterStatus } from '@/enums/letterStatus';

export type KeyboardButton = {
  symbol: string;
  type: KeyboardType;
  status: LetterStatus | null;
};
