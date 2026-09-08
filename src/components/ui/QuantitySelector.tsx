import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div className="inline-flex items-center rounded-lg border border-stone-300 bg-stone-50 shadow-xs">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${
          isSm ? 'w-7 h-7' : 'w-9 h-9'
        } flex items-center justify-center text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-l-lg hover:bg-stone-200/60`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      <span
        className={`${
          isSm ? 'w-7 text-xs' : 'w-10 text-sm'
        } font-semibold text-center text-stone-900 select-none`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${
          isSm ? 'w-7 h-7' : 'w-9 h-9'
        } flex items-center justify-center text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-r-lg hover:bg-stone-200/60`}
        aria-label="Increase quantity"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>
    </div>
  );
};
