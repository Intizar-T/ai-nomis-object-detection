import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

const COCO_SSD = async (state, dispatch) => {
    if(state.files.length > 0){
        const net  = await cocossd.load();
        const images = await Images(state.files);
        const rects = state.rectangles;
        
        images.forEach(async (image, i) => {
            let rect = rects[i];
            const prediction = await net.detect(image);
            
            const [x, y, width, height] = prediction[0]['bbox'];
            const label = prediction[0]['class'];
            rect.x = x;
            rect.y = y;
            rect.width = width;
            rect.height = height;
            rect.label = label;
            
            rects[i] = rect;
            
            dispatch({ type: "UPDATE_RECTS",  rects: rects});
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