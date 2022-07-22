import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
// import { useContext } from "react";
// import { Context } from "../context/context";

const COCO_SSD = async (rects, imageURLs) => {
    const net  = await cocossd.load();
    console.log("COCO-SSD loaded!");
    if(imageURLs.length !== 0) {
        console.log(imageURLs);
    }

   /*  imageURLs.forEach(async (imageURL, i) => {
        let rect = rects[i];
        let url = imageURL[1];
        const prediction = await net.detect(url);
        console.log(prediction);
        const [x, y, width, height] = prediction['bbox'];
        const label = prediction['class'];
        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;
        rect.label = label;
    }); */
    
}

export default COCO_SSD;