import { useCallback, useRef, useState } from 'react';

import { TOOLTIP_HIDE_DELAY } from '../constants/gameConfig.ts';
import { TooltipEmojis, TooltipMessages } from '../constants/tooltipMessages.ts';
import { LetterStatus } from '../enums/letterStatus.ts';
import { TOOLTIP_MESSAGE } from '../enums/tooltipMessage.ts';
import { Tooltip } from '../types/Tooltip';

const useTooltip = () => {
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [preventCloseTooltip, setPreventCloseTooltip] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip>({
    show: false,
    message: TooltipMessages[TOOLTIP_MESSAGE.INVALID_WORD],
    emoji: TooltipEmojis[TOOLTIP_MESSAGE.INVALID_WORD],
    position: {
      rowIndex: 0,
      cellIndex: 0
    }
  });

  const getTooltipMessageByLetterStatus = useCallback((status: LetterStatus): TOOLTIP_MESSAGE => {
    switch (status) {
      case LetterStatus.NOT_IN_WORD:
        return TOOLTIP_MESSAGE.LETTER_NOT_IN_WORD;
      case LetterStatus.WRONG_PLACE:
        return TOOLTIP_MESSAGE.INCORRECT_LETTER_POSITION;
      default:
        return TOOLTIP_MESSAGE.CORRECT_LETTER_POSITION;
    }
  }, []);

  const triggerTooltip = useCallback((type: TOOLTIP_MESSAGE, row: number, cell: number) => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    setPreventCloseTooltip(true);
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      message: TooltipMessages[type],
      emoji: TooltipEmojis[type],
      position: { rowIndex: row, cellIndex: cell },
      show: true
    }));
    tooltipTimeout.current = setTimeout(() => {
      setTooltip((prevTooltip) => ({ ...prevTooltip, show: false }));
    }, TOOLTIP_HIDE_DELAY);
  }, []);

  const hideTooltip = useCallback(() => {
    if (preventCloseTooltip) {
      setPreventCloseTooltip(false);
      return;
    }
    setTooltip((prevTooltip) => ({ ...prevTooltip, show: false }));
  }, [preventCloseTooltip]);

  return {
    tooltip,
    preventCloseTooltip,
    getTooltipMessageByLetterStatus,
    triggerTooltip,
    hideTooltip
  };
};

export default useTooltip;
