import tf, { tensor } from "@tensorflow/tfjs";
import fs from "fs";
import csv from "csv-parser";

const types = ["Квартира", "Многоквартирный дом"];

async function loadPartialData(filePath, limit = 1000) {
  return new Promise((resolve, reject) => {
    const data = [];
    let count = 0;
    const readStream = fs.createReadStream(filePath);
    const csvParser = csv();

    readStream
      .pipe(csvParser)
      .on("data", (row) => {
        if (count < limit) {
          const type = types.indexOf(row.type) >= 0 ? row.type : false;
          const rooms = parseFloat(row.rooms) >= 1 ? row.type : false;
          const [level, maxLevel] = row.level.split("/").map(Number)
          

          data.push({
            // level: parseFloat(row.level),
            // rooms: parseInt(row.rooms) === -1 ? 0 : parseInt(row.rooms), // Студии преобразуем в 0
            // area: parseFloat(row.area),
            // object_type: parseFloat(row.object_type),
            // geo_lat: parseFloat(row.geo_lat),
            // geo_lon: parseFloat(row.geo_lon),
            // price: parseFloat(row.price),
          });
          count++;
        }
        if (count >= limit) {
          readStream.unpipe(csvParser);
          csvParser.end();
        }
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    // if (
    //   req.query.floor &&
    //   req.query.rooms &&
    //   req.query.area &&
    //   req.query.type &&
    //   req.query.lat &&
    //   req.query.lon
    // ) {
    //   const data = await loadPartialData("./static/");

    //   const features = data.map((d) => [
    //     d.level,
    //     d.rooms,
    //     d.area,
    //     d.object_type,
    //     d.geo_lat,
    //     d.geo_lon,
    //   ]);
    //   const labels = data.map((d) => d.price);

    //   const INPUT_TENSOR = tf.tensor2d(features);
    //   const OUTPUT_TENSOR = tf.tensor1d(labels);

    //   const MIN_INPUT_VALUE = tf.min(INPUT_TENSOR, 0);
    //   const MAX_INPUT_VALUE = tf.max(INPUT_TENSOR, 0);

    //   const normalize = (tensor) => {
    //     const res = tf.tidy(() => {
    //       // Создание substract tensor и range size
    //       const SUBSTRACT_TENSOR = tf.sub(tensor, MIN_INPUT_VALUE);
    //       const RANGE_SIZE = tf.sub(MAX_INPUT_VALUE, MIN_INPUT_VALUE);
    //       const NORMALIZED_TENSOR = tf.div(SUBSTRACT_TENSOR, RANGE_SIZE);
    //       return NORMALIZED_TENSOR;
    //     });

    //     return res;
    //   };
    //   const NORMALIZER_INPUT_TENSOR = normalize(INPUT_TENSOR);

    //   let model = tf.sequential();
    //   model.add(tf.layers.dense({ inputShape: [6], units: 1 }));

    //   const train = async () => {
    //     // Компиляция модели
    //     // Указание оптимизватора и функции потерь
    //     model.compile({
    //       optimizer: tf.train.sgd(0.001), // learning rate = 0.01,
    //       loss: "meanSquaredError",
    //     });
    //     //Обучение
    //     await model.fit(NORMALIZER_INPUT_TENSOR, OUTPUT_TENSOR, {
    //       batchSize: 128,
    //       epochs: 30,
    //       shuffle: true,
    //     });

    //     // Удаление промежуточных тензоров
    //     NORMALIZER_INPUT_TENSOR.dispose();
    //     OUTPUT_TENSOR.dispose();
    //   };

    //   await train();

    //   const tryToPredict = (array) => {
    //     return tf.tidy(() => {
    //       let input = normalize(tf.tensor2d(array));

    //       let output = model.predict(input);

    //       output.print();
    //       const outputData = output.dataSync(); // Получаем массив значений

    //       // Предположим, что модель возвращает один результат
    //       const result = outputData[0];

    //       return result;
    //     });
    //   };

    //   // Этаж, комнаты, площадь, тип постройки, lat, lon

    //   const cost = tryToPredict([
    //     [
    //       Number(req.query.floor),
    //       Number(req.query.rooms),
    //       Number(req.query.area),
    //       Number(req.query.type),
    //       Number(req.query.lat),
    //       Number(req.query.lon),
    //     ],
    //   ]);

    //   return res.status(200).json({ cost: cost });
    // } else {
    //   return res.status(400).json({ error: "Bad request" });
    // }

    return res.status(200).json({ cost: "" });
  }
  return res.status(401).json({ message: "Method not allowed" });
}
