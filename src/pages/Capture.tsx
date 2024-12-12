import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CameraPreview } from '../components/camera/CameraPreview';
import { ModelSelector } from '../components/prediction/ModelSelector';
import { PredictionResult } from '../components/prediction/PredictionResult';
import { Button } from '../components/ui/Button';
import { usePrediction } from '../hooks/usePrediction';
import { ModelLoader } from '../services/ml/modelLoader';

export function Capture() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<'LRM' | 'SVR'>('LRM');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const { predict, predicting, error } = usePrediction();

  useEffect(() => {
    const initializeModels = async () => {
      try {
        setModelLoading(true);
        await ModelLoader.getInstance().loadModels();
      } catch (error) {
        toast.error('Failed to load AI models. Please refresh the page.');
      } finally {
        setModelLoading(false);
      }
    };

    initializeModels();
  }, []);

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setPrediction(null);
  };

  const handlePredict = async () => {
    if (!capturedImage) return;
    
    try {
      const result = await predict(capturedImage, selectedModel);
      setPrediction(result);
      toast.success('Prediction completed successfully!');
    } catch (err) {
      toast.error('Failed to process prediction. Please try again.');
      console.error('Prediction failed:', err);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setPrediction(null);
  };

  if (modelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Thermal Image Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <CameraPreview
              onCapture={handleCapture}
              capturedImage={capturedImage}
            />
            
            <div className="flex space-x-4">
              <Button
                onClick={handleReset}
                variant="secondary"
                disabled={!capturedImage || predicting}
              >
                Reset
              </Button>
              <Button
                onClick={handleCapture}
                disabled={!!capturedImage || predicting}
              >
                Capture Image
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <ModelSelector
              value={selectedModel}
              onChange={setSelectedModel}
              disabled={!capturedImage || predicting}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {capturedImage && (
              <Button
                onClick={handlePredict}
                disabled={predicting}
                loading={predicting}
                className="w-full"
              >
                Analyze Image
              </Button>
            )}

            {prediction !== null && (
              <PredictionResult
                bcsScore={prediction}
                modelUsed={selectedModel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}