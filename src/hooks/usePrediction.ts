import { useState, useCallback } from 'react';
import api from '../utils/api';
import { resizeImage } from '../utils/imageProcessing';

interface PredictionResult {
  bcsScore: number;
  imageUrl: string;
  modelUsed: 'LRM' | 'SVR';
}

export const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (
    file: File,
    modelType: 'LRM' | 'SVR'
  ): Promise<PredictionResult> => {
    setLoading(true);
    setError(null);

    try {
      const imageData = await resizeImage(file);
      const { data } = await api.post('/predictions/predict', {
        imageData,
        model: modelType,
      });

      const prediction = await api.post('/predictions', {
        bcsScore: data.bcsScore,
        imageUrl: imageData,
        modelUsed: modelType,
      });

      return prediction.data;
    } catch (err) {
      setError('Failed to process prediction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { predict, loading, error };
};