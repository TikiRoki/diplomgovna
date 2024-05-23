import tf from "@tensorflow/tfjs";

// Берем данные
import { TRAINING_DATA } from "./data.js";

const INPUT_TENSOR = tf.tensor2d(TRAINING_DATA.inputs);
const OUTPUT_TENSOR = tf.tensor1d(TRAINING_DATA.outputs);

// Нормализируем данные
const MIN_INPUT_VALUE = tf.min(INPUT_TENSOR, 0);
const MAX_INPUT_VALUE = tf.max(INPUT_TENSOR, 0);
const normalize = (tensor) => {
  const res = tf.tidy(() => {
    // Создание substract tensor и range size
    const SUBSTRACT_TENSOR = tf.sub(tensor, MIN_INPUT_VALUE);
    const RANGE_SIZE = tf.sub(MAX_INPUT_VALUE, MIN_INPUT_VALUE);
    const NORMALIZED_TENSOR = tf.div(SUBSTRACT_TENSOR, RANGE_SIZE);
    return NORMALIZED_TENSOR;
    return null;
  });

  return res;
};
const NORMALIZER_INPUT_TENSOR = normalize(INPUT_TENSOR);

// Создание модели
let model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 1 }));

// Обучение модели
const train = async () => {
  // Компиляция модели
  // Указание оптимизватора и функции потерь
  model.compile({
    optimizer: tf.train.sgd(0.01), // learning rate = 0.01,
    loss: "meanSquaredError",
  });
  //Обучение
  await model.fit(NORMALIZER_INPUT_TENSOR, OUTPUT_TENSOR, {
    batchSize: 64,
    epochs: 10,
    shuffle: true,
  });

  // Удаление промежуточных тензоров
  NORMALIZER_INPUT_TENSOR.dispose();
  OUTPUT_TENSOR.dispose();
};

await train();

//Функция для предположения
const tryToPredict = (array) => {
  tf.tidy(() => {
    let input = normalize(tf.tensor2d(array));

    let output = model.predict(input);

    output.print();
  });
};

// Сюда вводятся данные для проверки угадывания
tryToPredict([
  [3056, 3],
  [1024, 2],
  [950, 1],
]);

MIN_INPUT_VALUE.dispose();
MAX_INPUT_VALUE.dispose();
model.dispose();
INPUT_TENSOR.dispose();
