import React from 'react';

interface ModelSelectorProps {
  value: 'LRM' | 'SVR';
  onChange: (model: 'LRM' | 'SVR') => void;
  disabled?: boolean;
}

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Prediction Model
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onChange('LRM')}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            ${value === 'LRM'
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}
          `}
        >
          Linear Regression (LRM)
        </button>
        <button
          onClick={() => onChange('SVR')}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            ${value === 'SVR'
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}
          `}
        >
          Support Vector Regression (SVR)
        </button>
      </div>
    </div>
  );
}