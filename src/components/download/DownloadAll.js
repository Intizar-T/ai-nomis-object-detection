import JSZipUtils from "jszip-utils";
import { saveAs } from 'save-as'

const DownloadAll = async (state, dispatch, forDetection) => {
    const JSZip = require('jszip');
    let zip = new JSZip();
    const zipFileName = "Labeled_Object_Images.zip";
    const filesLength = state.files.length;



    const promises = state.files.map((file, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new window.Image();
        img.src = file[1];

        return new Promise((resolve, reject) => {
            img.onload = function() {
                try {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);

                    if(!forDetection){
                        const currRect = state.rectangles[index];
                        context.lineWidth = currRect.strokeWidth;
                        context.strokeRect(currRect.x, currRect.y, currRect.width, currRect.height);

                    }
                    
                    // URLs.push([file[0], canvas.toDataURL()]);
                    resolve([file[0], canvas.toDataURL()]);
                } catch(err){
                    // do something;
                    reject(err);
                }
            }
        })
    });

    try {
        const result = await Promise.all(promises);
        result.forEach(function(url, i) {
                let imageName = url[0];
                console.log(url);
                if(forDetection){
                    //console.log(url[1]);
                    dispatch({ type: "UPDATE_IMAGE_URLS", URLs: url[1] });
                }

                else {
                    JSZipUtils.getBinaryContent(url[1], function(err, data) {
                        if(err) {
                            console.log("Error while Downloading all images: \n" + err);
                            alert("Error occured while downloading all images");
                        }
                        else {
                            zip.file(imageName, data, {binary: true});
                            if(i === filesLength - 1){
                                zip.generateAsync({type: 'blob'}).then(function(content) {
                                    saveAs(content, zipFileName);
                                });
                            }
                        }
                    });
                }
            });
    } catch(err) {
        console.error(err);
    }

    

   
        /* const handleLoad = () => {
            //console.log(image.width + ", " + image.height);
            context.canvas.width = image.width;
            context.canvas.height= image.height;
            //con
        }

        image.addEventListener('load', handleLoad); */
        
        
        //console.log(canvas);
        
        //document.body.removeChild(canvas);
    
    /* const nextButton = document.getElementById("nextButton");
    nextButton.click();
    console.log("pressed next, about to press prev");
    const prevButton = document.getElementById("prevButton");
    prevButton.click(); */
};

export default DownloadAll;