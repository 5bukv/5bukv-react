import type { ProposedLetter } from '../types/ProposedLetter';

export default function reduceWord(proposedWord: ProposedLetter[]): string {
  return proposedWord.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.letter;
  }, '');
}
