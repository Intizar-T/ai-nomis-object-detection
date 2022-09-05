import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

const COCO_SSD = async (state, dispatch) => {
  if (state.files.length > 0) {
    dispatch({ type: "RESET_LABELS" });
    const net = await cocossd.load();
    const images = await Images(state.files);
    const rects = state.rectangles;
    let labels = [];

    images.forEach(async (image, i) => {
      try {
        let rect = rects[i];
        const prediction = await net.detect(image);

        if (prediction.length === 0) return;

        const [x, y, width, height] = prediction[0]["bbox"];
        const label = prediction[0]["class"];
        if (!labels.includes(label)) labels.push(label);
        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;

        const new_hist = {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        };
        rect.hist.push(new_hist);

        rect.label = label;

        rects[i] = rect;

        dispatch({ type: "UPDATE_RECTS", rects: rects });
      } catch (err) {
        console.log(err);
      }
    });
    dispatch({ type: "INIT_LABELS", labels: labels });
    dispatch({ type: "UPDATE_IMAGES_READY", ready: true });
    dispatch({ type: "UPDATE_PROCESSING_STARTED", started: false });
    // console.log("-------------------------");
  }
};

const Images = async (files) => {
  const promises = files.map((file, index) => {
    const img = new window.Image();
    img.src = file[1];
    return new Promise((resolve, reject) => {
      img.onload = function () {
        try {
          // console.log("from COCO-SSD, imageSize:");
          // console.log(file[2]);
          img.width = file[2].width;
          img.height = file[2].height;
          resolve(img);
        } catch (err) {
          console.log(err);
        }
      };
    });
  });

  try {
    const result = await Promise.all(promises);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export default COCO_SSD;
