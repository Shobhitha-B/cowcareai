import * as tf from '@tensorflow/tfjs-node';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

class MLService {
  constructor() {
    this.lrmModel = null;
    this.svrModel = null;
  }

  async loadModels() {
    try {
      this.lrmModel = await tf.loadLayersModel('file://' + join(__dirname, '../../public/models/lrm/model.json'));
      this.svrModel = await tf.loadLayersModel('file://' + join(__dirname, '../../public/models/svr/model.json'));
      console.log('Models loaded successfully');
    } catch (error) {
      console.error('Error loading models:', error);
      throw error;
    }
  }

  async preprocessImage(imageData) {
    const buffer = Buffer.from(imageData.split(',')[1], 'base64');
    const processedImage = await sharp(buffer)
      .resize(224, 224)
      .toBuffer();

    const tensor = tf.node.decodeImage(processedImage)
      .expandDims()
      .toFloat()
      .div(255.0);

    return tensor;
  }

  async predict(imageData, modelType) {
    try {
      const selectedModel = modelType === 'LRM' ? this.lrmModel : this.svrModel;
      if (!selectedModel) {
        throw new Error('Model not loaded');
      }

      const tensor = await this.preprocessImage(imageData);
      const prediction = await selectedModel.predict(tensor).data();
      tensor.dispose();

      return prediction[0];
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }
}

export default new MLService();