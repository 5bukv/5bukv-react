import React, { useRef } from 'react';

import useClickOutside from '../hooks/useClickOutside.ts';
import { Tooltip } from '../types/Tooltip';

interface CellTooltipProps {
  config: Tooltip;
  rowIndex: number;
  cellIndex: number;
  onHide: () => void;
}

const CellTooltip: React.FC<CellTooltipProps> = ({ config, rowIndex, cellIndex, onHide }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    tooltipRef,
    () => {
      onHide();
    },
    config.show && rowIndex === config.position.rowIndex && cellIndex === config.position.cellIndex
  );

  return (
    <div
      ref={tooltipRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute top-[calc(100%+15px)] z-20 h-auto min-w-32 rounded-lg bg-white p-2.5 text-center text-[13px] font-normal leading-[1.15] text-[#202020] duration-300 ease-[cubic-bezier(0.4,0.1,0.2,1)] before:absolute before:top-0 before:inline-block before:-translate-x-2/4 before:-translate-y-6 before:border-[12px] before:border-solid before:border-transparent before:border-b-[white] before:content-[''] ${
        config.show &&
        rowIndex === config.position.rowIndex &&
        cellIndex === config.position.cellIndex
          ? 'opacity-100 [transform:translateY(0)_translateZ(1px)_scale(1)]'
          : 'pointer-events-none opacity-0 [transform:translateY(-4px)_translateZ(1px)_scale(0.5)]'
      }`}
      style={{
        display:
          config.show &&
          rowIndex === config.position.rowIndex &&
          cellIndex === config.position.cellIndex
            ? 'block'
            : 'none'
      }}
    >
      <span className="block" dangerouslySetInnerHTML={{ __html: config.message }} />
      <span className="mt-1 block">{config.emoji}</span>
    </div>
  );
};

export default CellTooltip;
