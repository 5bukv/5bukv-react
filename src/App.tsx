import React, { useEffect } from 'react';

import AppModal from './components/AppModal';
import CellTooltip from './components/CellTooltip';
import KeyboardKey from './components/KeyboardKey';
import RoundCell from './components/RoundCell';
import { GameStatus } from './enums/gameStatus';
import useGame from './hooks/useGame';

const App: React.FC = () => {
  const {
    grid,
    modal,
    buttons,
    gameStatus,
    errorState,
    round,
    tooltip,
    hideTooltip,
    onStartGame,
    onInput,
    onClearLetter,
    onCheckWord,
    onCellClick,
    setModal
  } = useGame();

  useEffect(() => {
    setModal(true);
  }, [setModal]);

  return (
    <main className="min-h-screen justify-center text-white sm:flex sm:flex-col sm:items-center sm:bg-[#2C2C2E]">
      <div className="w-full max-w-[1104px] bg-[#1c1c1e] px-4 py-4 sm:h-auto sm:rounded-3xl sm:py-24">
        <div className="mx-auto max-w-[655px]">
          <img src="/logo.png" className="mb-6 h-6" alt="Игра «5 букв»" />
          <div className="relative mx-auto mb-[26px] max-w-[80%] space-y-1.5 sm:max-w-64">
            {grid.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex space-x-1.5 ${errorState.active && rowIndex === round ? 'animate-shake text-error-red' : ''}`}
              >
                {row.map((cell, cellIndex) => (
                  <RoundCell
                    key={cellIndex}
                    status={cell.status}
                    letter={cell.letter}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    onClick={onCellClick}
                  >
                    <CellTooltip
                      config={tooltip}
                      rowIndex={rowIndex}
                      cellIndex={cellIndex}
                      onHide={hideTooltip}
                    />
                  </RoundCell>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full overflow-x-hidden">
          {buttons.map((buttonRow, rowIndex) => (
            <div
              key={rowIndex}
              className="mb-6 flex justify-center space-x-0.5 last:mb-0 sm:space-x-2"
            >
              {buttonRow.map((button) => (
                <KeyboardKey
                  key={button.symbol}
                  keyboardButton={button}
                  onInput={onInput}
                  onDelete={onClearLetter}
                  onApply={onCheckWord}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <AppModal value={modal}>
        <div className="w-full max-w-[616px] rounded-3xl bg-[#2c2c2e] px-20 py-12 text-center">
          <p className="mb-4 text-center text-xl font-semibold text-[#ffdd2d]">
            {gameStatus === GameStatus.PLAYING
              ? 'Отгадайте первое слово'
              : gameStatus === GameStatus.WIN
                ? 'Вы отгадали слово!'
                : 'Вы не отгадали слово'}
          </p>
          <button
            onClick={onStartGame}
            className="mx-auto rounded-2xl bg-white px-6 py-4 text-[17px] font-normal text-[#333]"
          >
            {gameStatus === GameStatus.PLAYING ? 'Начать игру' : 'Играть снова'}
          </button>
        </div>
      </AppModal>
    </main>
  );
};

export default App;
