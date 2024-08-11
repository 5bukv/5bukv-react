import { useCallback, useMemo, useState } from 'react';

import useButtons from './useButtons.ts';
import useTooltip from './useTooltip.ts';
import { MAX_ROUNDS, MAX_CELLS, ERROR_ANIMATION_DELAY } from '../constants/gameConfig.ts';
import words from '../data/words.json';
import { ErrorStatus } from '../enums/errorStatus.ts';
import { GameStatus } from '../enums/gameStatus.ts';
import { LetterStatus } from '../enums/letterStatus.ts';
import { RoundStatus } from '../enums/roundStatus.ts';
import { TOOLTIP_MESSAGE } from '../enums/tooltipMessage.ts';
import compareWords from '../libs/compareWords.ts';
import getRandomNumber from '../libs/getRandomNumber.ts';
import reduceWord from '../libs/reduceWord.ts';
import { Cell } from '../types/Cell';
import { CompareWordsResult } from '../types/CompareWordsResult';

const useGame = () => {
  const { buttons, updateButtonStatus, resetButtons } = useButtons();
  const {
    tooltip,
    preventCloseTooltip,
    getTooltipMessageByLetterStatus,
    triggerTooltip,
    hideTooltip
  } = useTooltip();

  const [modal, setModal] = useState(false);
  const [secretWord, setSecretWord] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [grid, setGrid] = useState<Cell[][]>(fillGrid());
  const [round, setRound] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [cell, setCell] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [errorState, setErrorState] = useState<{
    active: boolean;
    type: ErrorStatus | null;
  }>({
    active: false,
    type: null
  });

  const usedWords = useMemo(() => {
    return grid
      .slice(0, round)
      .map((row) => row.map((cell) => cell.letter).join(''))
      .filter((word) => word.trim().length === 5);
  }, [grid, round]);

  function fillGrid() {
    return Array(MAX_ROUNDS)
      .fill(null)
      .map(() =>
        Array(MAX_CELLS)
          .fill(null)
          .map(() => ({ letter: '', status: LetterStatus.DEFAULT }))
      );
  }

  const onStartGame = useCallback(() => {
    setGrid(fillGrid());
    setRound(0);
    setCell(0);
    setGameStatus(GameStatus.PLAYING);
    resetButtons();
    const number = getRandomNumber(0, words.length - 1);
    setSecretWord(words[number]);
    setModal(false);
  }, [resetButtons]);

  const onInput = useCallback(
    (letter: string) => {
      if (grid[round][MAX_CELLS - 1].letter) return;
      const newGrid = [...grid];
      newGrid[round][cell].letter = letter.toUpperCase();
      setGrid(newGrid);
      if (cell < MAX_CELLS - 1) {
        setCell((prevCell) => (prevCell + 1) as 0 | 1 | 2 | 3 | 4);
      }
    },
    [grid, round, cell]
  );

  const onClearLetter = useCallback(() => {
    if (cell === 0) return;
    const newGrid = [...grid];
    if (cell === MAX_CELLS - 1 && newGrid[round][cell].letter !== '') {
      newGrid[round][cell].letter = '';
      setGrid(newGrid);
      return;
    }
    newGrid[round][cell - 1].letter = '';
    setCell((prevCell) => (prevCell - 1) as 0 | 1 | 2 | 3 | 4);
    setGrid(newGrid);
  }, [grid, round, cell]);

  const checkGameStatus = useCallback(
    (result: CompareWordsResult) => {
      if (result.status === RoundStatus.WIN) {
        setGameStatus(GameStatus.WIN);
        setModal(true);
        return true;
      }
      if (round === MAX_ROUNDS - 1) {
        setGameStatus(GameStatus.LOSE);
        setModal(true);
        return true;
      }
      return false;
    },
    [round]
  );

  const updateStatuses = useCallback(
    (currentRow: Cell[], result: CompareWordsResult) => {
      const newGrid = [...grid];
      currentRow.forEach((cell, index) => {
        const status = result.proposedWord[index].status;
        cell.status = status;
        updateButtonStatus(cell.letter, status);
      });
      setGrid(newGrid);
    },
    [grid, updateButtonStatus]
  );

  const triggerErrorAnimation = useCallback(() => {
    return new Promise<void>((resolve) => {
      setErrorState({ active: true, type: errorState.type });
      setTimeout(() => {
        setErrorState({ active: false, type: null });
        resolve();
      }, ERROR_ANIMATION_DELAY);
    });
  }, [errorState]);

  const getTargetPosition = useCallback(({ proposedWord }: CompareWordsResult) => {
    let cellIndex = 0;
    for (let index = 0; index < proposedWord.length; index++) {
      if (proposedWord[index].status === LetterStatus.WRONG_PLACE) {
        cellIndex = index;
      } else if (proposedWord[index].status === LetterStatus.NOT_IN_WORD) {
        cellIndex = index;
        break;
      }
    }
    return cellIndex;
  }, []);

  const onCheckWord = useCallback(async () => {
    const currentRow = grid[round];

    if (cell !== MAX_CELLS - 1 || currentRow[cell].letter === '') return;

    const reducedWord = reduceWord(currentRow);
    if (usedWords.includes(reducedWord)) {
      setErrorState({ active: true, type: ErrorStatus.REPEATED });
      await triggerErrorAnimation();
      triggerTooltip(TOOLTIP_MESSAGE.WORD_ALREADY_USED, round, 0);
      return;
    }

    const result = compareWords(currentRow, secretWord);
    if (result.status === RoundStatus.NOT_FOUND) {
      setErrorState({ active: true, type: ErrorStatus.NOT_FOUND });
      await triggerErrorAnimation();
      triggerTooltip(TOOLTIP_MESSAGE.INVALID_WORD, round, 0);
      return;
    }

    updateStatuses(currentRow, result);
    if (checkGameStatus(result)) return;

    const cellIndex = getTargetPosition(result);
    const tooltipStatus = getTooltipMessageByLetterStatus(result.proposedWord[cellIndex].status);
    triggerTooltip(tooltipStatus, round, cellIndex);
    setCell(0);
    setRound((prevRound) => (prevRound + 1) as 0 | 1 | 2 | 3 | 4 | 5);
  }, [
    grid,
    round,
    cell,
    usedWords,
    triggerErrorAnimation,
    triggerTooltip,
    updateStatuses,
    checkGameStatus,
    getTargetPosition,
    getTooltipMessageByLetterStatus
  ]);

  const onCellClick = useCallback(
    (data: { status: LetterStatus; rowIndex: number; cellIndex: number }) => {
      if (
        tooltip.show &&
        tooltip.position.cellIndex === data.cellIndex &&
        tooltip.position.rowIndex === data.rowIndex
      ) {
        hideTooltip();
        return;
      }
      const message = getTooltipMessageByLetterStatus(data.status);
      triggerTooltip(message, data.rowIndex, data.cellIndex);
    },
    [tooltip, hideTooltip, getTooltipMessageByLetterStatus, triggerTooltip]
  );

  return {
    grid,
    modal,
    buttons,
    gameStatus,
    errorState,
    round,
    tooltip,
    preventCloseTooltip,
    onCellClick,
    hideTooltip,
    onStartGame,
    onInput,
    onClearLetter,
    onCheckWord,
    triggerTooltip,
    setModal
  };
};
export default useGame;
