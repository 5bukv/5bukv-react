import generateYoCombinations from "./generateYoCombinations.ts";
import reduceWord from "./reduceWord.ts";
import replaceYo from "./replaceYo.ts";
import words from "../data/words.json";
import { LetterStatus } from "../enums/letterStatus.ts";
import { RoundStatus } from "../enums/roundStatus.ts";
import { CompareWordsResult } from "../types/CompareWordsResult";
import { ProposedLetter } from "../types/ProposedLetter";

function checkWordExist(word: string) {
  const combinations = generateYoCombinations(word);
  return combinations.some((combination) => words.includes(combination));
}

export default function compareWords(
  proposedWord: ProposedLetter[],
  secretWord: string,
): CompareWordsResult {
  const isWordExist = checkWordExist(reduceWord(proposedWord));
  const normalizedSecretWord = replaceYo(secretWord);

  if (!isWordExist) {
    return { status: RoundStatus.NOT_FOUND, proposedWord };
  }

  const secretWordArray: Array<string | null> = normalizedSecretWord.split("");

  const result: ProposedLetter[] = proposedWord.map((letterObj) => ({
    ...letterObj,
    status: LetterStatus.NOT_IN_WORD,
  }));

  for (let i = 0; i < proposedWord.length; i++) {
    if (proposedWord[i].letter === secretWordArray[i]) {
      result[i].status = LetterStatus.CORRECT;
      secretWordArray[i] = null;
    }
  }

  for (let i = 0; i < proposedWord.length; i++) {
    if (result[i].status === LetterStatus.CORRECT) {
      continue;
    }
    const letterIndex = secretWordArray.indexOf(proposedWord[i].letter);
    if (letterIndex !== -1) {
      result[i].status = LetterStatus.WRONG_PLACE;
      secretWordArray[letterIndex] = null;
    }
  }

  return {
    status: result.every((letter) => letter.status === LetterStatus.CORRECT)
      ? RoundStatus.WIN
      : RoundStatus.NOT_GUESSED,
    proposedWord: result,
  };
}
