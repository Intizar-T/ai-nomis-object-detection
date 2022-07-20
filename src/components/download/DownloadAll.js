import JSZipUtils from "jszip-utils";
import { saveAs } from 'save-as'

const DownloadAll = (state, dispatch, uri) => {
    //const currentFileIndex = state.currentFileIndex;
    const JSZip = require('jszip');
    let zip = new JSZip();
    const zipFileName = "Labeled_Object_Images.zip";
    //let imageName = "", link = null;
    const filesLength = state.files.length;
    //const URLs = [];

    //console.log(state.imageURLs);

    /* state.imageURLs.forEach(function(url, i) {
        //dispatch({ type:"UPDATE_CURRENT_FILE_INDEX", index: index });
        //console.log(state.currentFileIndex);
        link = document.createElement('a');
        link.download = i + ".png";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 
    }) */
    
    //dispatch({ type:"UPDATE_CURRENT_FILE_INDEX", index: currentFileIndex });
    //const image
    state.imageURLs.forEach(function(url, i) {
        let imageName = i + ".png";
        console.log(imageName);
        //console.log(URL);
        //url = url.replace(/^data:image\/(png|jpg);base64,/, "");
        JSZipUtils.getBinaryContent(url, function(err, data) {
            if(err) {
                console.log("Error while Downloading all images: \n" + err);
                alert("Error occured while downloading all images");
            }
            else {
                //console.log(imageName)
                zip.file(imageName, data, {binary: true});
                //count++;
                if(i === filesLength - 1){
                    console.log("about to zip");
                    zip.generateAsync({type: 'blob'}).then(function(content) {
                        saveAs(content, zipFileName);
                    });
                }
            }
        });
    });

    /* const nextButton = document.getElementById("nextButton");
    nextButton.click();
    console.log("pressed next, about to press prev");
    const prevButton = document.getElementById("prevButton");
    prevButton.click(); */
};

export default DownloadAll;