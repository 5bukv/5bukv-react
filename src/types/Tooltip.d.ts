import { TooltipEmojis, TooltipMessages } from '@/constants/tooltipMessages';

export type TooltipPosition = {
  rowIndex: number;
  cellIndex: number;
};

export type Tooltip = {
  show: boolean;
  message: (typeof TooltipMessages)[keyof typeof TooltipMessages];
  emoji: (typeof TooltipEmojis)[keyof typeof TooltipEmojis];
  position: TooltipPosition;
};
