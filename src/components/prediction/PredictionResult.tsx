import React from 'react';

interface PredictionResultProps {
  bcsScore: number;
  modelUsed: 'LRM' | 'SVR';
}

export function PredictionResult({ bcsScore, modelUsed }: PredictionResultProps) {
  const getScoreColor = (score: number) => {
    if (score <= 2.0) return 'text-red-600';
    if (score <= 2.5) return 'text-orange-600';
    if (score <= 4.0) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <h3 className="text-lg font-medium text-gray-900">Prediction Result</h3>
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Body Condition Score (BCS)</p>
        <p className={`text-3xl font-bold ${getScoreColor(bcsScore)}`}>
          {bcsScore.toFixed(1)}
        </p>
      </div>
      <div className="text-sm text-gray-500">
        Predicted using {modelUsed === 'LRM' ? 'Linear Regression' : 'Support Vector Regression'}
      </div>
    </div>
  );
}