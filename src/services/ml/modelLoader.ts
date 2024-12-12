import * as tf from '@tensorflow/tfjs';

export class ModelLoader {
  private static instance: ModelLoader;
  private lrmModel: tf.LayersModel | null = null;
  private svrModel: tf.LayersModel | null = null;
  private isLoading: boolean = false;

  private constructor() {}

  static getInstance(): ModelLoader {
    if (!ModelLoader.instance) {
      ModelLoader.instance = new ModelLoader();
    }
    return ModelLoader.instance;
  }

  async loadModels() {
    if (this.isLoading) return;
    
    try {
      this.isLoading = true;
      
      // Load models in parallel
      const [lrm, svr] = await Promise.all([
        tf.loadLayersModel('/models/lrm/model.json'),
        tf.loadLayersModel('/models/svr/model.json')
      ]);

      this.lrmModel = lrm;
      this.svrModel = svr;
      
      console.log('Models loaded successfully');
    } catch (error) {
      console.error('Error loading models:', error);
      throw new Error('Failed to load AI models. Please try again later.');
    } finally {
      this.isLoading = false;
    }
  }

  async predict(imageData: string, modelType: 'LRM' | 'SVR'): Promise<number> {
    const model = modelType === 'LRM' ? this.lrmModel : this.svrModel;
    
    if (!model) {
      throw new Error('Model not loaded. Please wait for model initialization.');
    }

    try {
      const tensor = await this.preprocessImage(imageData);
      const prediction = model.predict(tensor) as tf.Tensor;
      const result = await prediction.data();
      
      // Cleanup
      tensor.dispose();
      prediction.dispose();

      return result[0];
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Failed to process image. Please try again.');
    }
  }

  private async preprocessImage(imageData: string): Promise<tf.Tensor> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Create a tensor from the image
          const tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([224, 224]) // Resize to model input size
            .toFloat()
            .expandDims(0)
            .div(255.0); // Normalize pixel values
          
          resolve(tensor);
        } catch (error) {
          reject(new Error('Failed to process image'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });
  }
}