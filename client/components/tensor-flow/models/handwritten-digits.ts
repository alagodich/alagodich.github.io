import * as TensorFlow from '@tensorflow/tfjs';
import {MnistData} from '../data/mnist-data';
import {IFitCallbackHandlers} from '../TensorFlowComponent';

export const IMAGE_WIDTH = 28;
export const IMAGE_HEIGHT = 28;
export const IMAGE_CHANNELS = 1;
// Number of possible output digits 0 to 10
export const NUM_CLASSES = 10;

/**
 * Lesson https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/index.html#2
 * Data http://yann.lecun.com/exdb/mnist/
 * Training set in one image https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png
 */
export function createModel(): TensorFlow.Sequential {
    const model = TensorFlow.sequential();

    model.add(TensorFlow.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        // The size of the sliding convolutional filter windows to be applied to the input data.
        // Here, we set a kernelSize of 5, which specifies a square, 5x5 convolutional window.
        // This is a filter size basically
        kernelSize: 5,
        // Split each image matrix into 8 parts
        filters: 8,
        // The "step size" of the sliding window—i.e.,
        // how many pixels the filter will shift each time it moves over the image.
        // Here, we specify strides of 1, which means that the filter will slide over the image in steps of 1 pixel.
        strides: 1,
        activation: 'relu',
        // Method of randomly generating weights
        kernelInitializer: 'varianceScaling'
    }));

    // The MaxPooling layer acts as a sort of downsampling using max values
    // in a region instead of averaging.
    model.add(TensorFlow.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

    model.add(TensorFlow.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
    }));

    model.add(TensorFlow.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

    // Convert pixel matrix (filter) to one dimensional vector
    // In out case, each filter is 5x5, will be converted to [null, 25] shape
    model.add(TensorFlow.layers.flatten());

    // Output is 10 digits, 0-10 variants, one to ten mapping, one image to 10 results, classification task
    model.add(TensorFlow.layers.dense({
        units: NUM_CLASSES,
        activation: 'softmax',
        kernelInitializer: 'varianceScaling'
    }));

    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}

export function trainModel(
    model: TensorFlow.Sequential,
    data: MnistData,
    fitCallbacks: IFitCallbackHandlers
): Promise<TensorFlow.History> {
    const batchSize = 512;
    const epochs = 10;
    const trainDataSize = 55000;
    const testDataSize = 10000;

    const [trainXs, trainYs] = TensorFlow.tidy(() => {
        const batch = data.nextTrainBatch(trainDataSize);

        return [
            batch.xs.reshape([trainDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]),
            batch.labels
        ];
    });

    const [testXs, testYs] = TensorFlow.tidy(() => {
        const batch = data.nextTestBatch(testDataSize);

        return [
            batch.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]),
            batch.labels
        ];
    });

    return model.fit(trainXs, trainYs, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: fitCallbacks,
        validationData: [testXs, testYs]
    });
}
