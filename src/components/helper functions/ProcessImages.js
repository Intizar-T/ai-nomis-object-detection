import JSZip from "jszip";
import COCO_SSD from "./COCO-SSD";
import DownloadAll from "../download/DownloadAll";

const ProcessImages = (state, dispatch, files) => {
    function processFilename(p) {
        let names = p.split("/");
        let name = names.pop();
        if (name.slice(0, 2) === "._") {
            name = name.slice(2);
        }
        return name;
    }

    let promise = JSZip.loadAsync(files[0]).then(function (zip) {
        const re = /(.jpg|.png|.gif|.ps|.jpeg|.webp)$/;

        const names = [];

        const promises = Object.keys(zip.files)
            .filter(function (fileName) {
                const name = processFilename(fileName);
                if (names.includes(name)) {
                    return false;
                }
                names.push(name);
                return re.test(fileName.toLowerCase());
            })
            .map(function (fileName) {
                const file = zip.files[fileName];
                return file.async("blob").then(function (blob) {
                    let names = fileName.split("/");
                    let name = names.pop();
                    if (name.slice(0, 2) === "._") {
                        name = name.slice(2);
                    }
                    return [name, URL.createObjectURL(blob)];
                });
            });

        return Promise.all(promises);
    });
    //console.log()
    promise.then((data) => {
        const length = data.length;
        dispatch({ type: "INIT_RECTS", length });
        dispatch({ type: "INIT_BOXES", length });
        dispatch({ type: "SET_LABELPROMPT", label: true });
        dispatch({ type: "SET_FILES", files: data });
        dispatch({ type: "SET_CURRENT_FILE_INDEX", index: 0 });
        
        DownloadAll(state, dispatch, true);
        COCO_SSD(state.rectangles, state.imageURLs);
    });

    
    
}

export default ProcessImages;