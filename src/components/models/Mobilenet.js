import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const Mobilenet = async (state, dispatch) => {
  if (state.files.length > 0) {
    dispatch({ type: "RESET_LABELS" });
    const net = await mobilenet.load();
    const images = await Images(state.files);
    let labels = [];

    images.forEach(async (image, i) => {
      try {
        const prediction = await net.classify(image);
        if (prediction.length === 0) return;
        const probMap = {};
        for(let i = 0; i < prediction.length; i++) {
          probMap[prediction[i].probability] = prediction[i].className;
        }
        // TODO: find the max prob!
        const maxPrediction = {
          className: prediction[0].className,
          probability: prediction[0].probability.toFixed(3),
        };
        dispatch({
          type: "UPDATE_MOBILENET_RESULTS",
          results: maxPrediction,
        });
      } catch (err) {
        console.log(err);
      }
    });
    dispatch({ type: "INIT_LABELS", labels: labels });
    dispatch({ type: "UPDATE_IMAGES_READY", ready: true });
  }
};

const Images = async (files) => {
  const promises = files.map((file, index) => {
    const img = new window.Image();
    img.src = file[1];
    return new Promise((resolve, reject) => {
      img.onload = function () {
        try {
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

export default Mobilenet;
