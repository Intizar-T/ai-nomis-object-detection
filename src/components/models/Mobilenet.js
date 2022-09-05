import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const Mobilenet = async (state, dispatch) => {
  if (state.files.length > 0) {
    const net = await mobilenet.load();
    const images = await Images(state.files);
    let mobilenetResults = [];
    let maxPrediction = {};

    images.forEach(async (image, i) => {
      try {
        const prediction = await net.classify(image);
        if (prediction.length === 0) return;
        // const probMap = {};
        // let prob = 0;
        // for (let i = 0; i < prediction.length; i++) {
        //   prob = prediction[i].probability.toFixed(3);
        //   probMap[prob] = prediction[i].className;
        // }
        // const maxKey = Math.max.apply(null, Object.keys(probMap));
        // console.log(maxKey);
        // // TODO: find the max prob!
        maxPrediction = {
          className: prediction[0].className,
          probability: prediction[0].probability.toFixed(3),
        };
        mobilenetResults.push(maxPrediction);
      } catch (err) {
        console.log(err);
      }
    });
    dispatch({
      type: "UPDATE_MOBILENET_RESULTS",
      results: mobilenetResults,
    });
    dispatch({ type: "UPDATE_IMAGES_READY", ready: true });
    dispatch({ type: "UPDATE_PROCESSING_STARTED", started: false });
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
