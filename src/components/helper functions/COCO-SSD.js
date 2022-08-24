import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Resizer from "react-image-file-resizer";

const COCO_SSD = async (state, dispatch) => {
    if(state.files.length > 0){
        const net  = await cocossd.load();
        const images = await Images(state.files);
        const rects = state.rectangles;
        
        images.forEach(async (image, i) => {
            try {
                
                let rect = rects[i];
                const prediction = await net.detect(image);
                
                if (prediction.length === 0) return;
                
                const [x, y, width, height] = prediction[0]['bbox'];
                const label = prediction[0]['class'];
                rect.x = x;
                rect.y = y;
                rect.width = width;
                rect.height = height;
                rect.label = label;
                
                rects[i] = rect;
                
                dispatch({ type: "UPDATE_RECTS",  rects: rects});
            } catch (err) {
                console.log("Error occured at COCO SSD: " + err);
            }
        });
    }
}

const Images = async (files) => {
    const promises = files.map((file, index) => {
        const img = new window.Image();
        img.src = file[1]; 
        return new Promise((resolve, reject) => {
            img.onload = function() {
                try {
                    // let imageWidth = img.width;
                    // let imageHeight = img.height;
                    // const maxSize = 250;
                    
                    // if(img.width > maxSize || img.height > maxSize) {
                    //     const ratio = Math.floor(img.width / img.height);
                    //     if(img.width > maxSize) {
                    //          imageWidth = maxSize;
                    //          imageHeight = imageWidth / ratio;
                    //     } else {
                    //          imageHeight = maxSize;
                    //          imageWidth = imageHeight * ratio;
                    //     }
                    // }
                    // img.width = imageWidth;
                    // img.height = imageHeight;
                    
                    // console.log(img.width + ", " + img.height);
                    img.width = 200;
                    img.height = 200;
                    resolve(img);
                } catch(err){
                    reject(err);
                }
            }
        })
    });

    try {
        const result = await Promise.all(promises);
        return result;
    } catch(err) {
        console.error(err);
    }
};

export default COCO_SSD;