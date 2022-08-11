import JSZip from "jszip";
import COCO_SSD from "./COCO-SSD";

const imageExtensions = ["jgp", "png", "gif", "ps", "jpeg", "webp"];

function getFileExtension(fname) {
    return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

function processFilename(p) {
    let names = p.split("/");
    let name = names.pop();
    if (name.slice(0, 2) === "._") {
        name = name.slice(2);
    }
    return name;
}

const ProcessImages = async (state, dispatch, e, socket, imagesScraped) => {
    if(imagesScraped){
        //console.log(e);
        const data = [];
        for(let i = 0; i < e.length; i++) {
            data.push([i, e[i]]);
        }
        const length = data.length;
        dispatch({ type: "INIT_RECTS", length });
        dispatch({ type: "INIT_BOXES", length });
        //dispatch({ type: "SET_LABELPROMPT", label: true });
        dispatch({ type: "SET_FILES", files: data });
        dispatch({ type: "SET_CURRENT_FILE_INDEX", index: 0 });
        socket.current?.close();
    }
    else {
        const files = e.target.files;
        const fileExtension = getFileExtension(files[0].name);
        
        if(fileExtension === 'zip'){
            //console.log(files[0]);
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
                        //console.log(file);
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
            promise.then((data) => {
                //console.log(data);
                const length = data.length;
                dispatch({ type: "INIT_RECTS", length });
                dispatch({ type: "INIT_BOXES", length });
                //dispatch({ type: "SET_LABELPROMPT", label: true });
                dispatch({ type: "SET_FILES", files: data });
                dispatch({ type: "SET_CURRENT_FILE_INDEX", index: 0 });
            });
        };
        
        // if(imageExtensions.includes(fileExtension)){
        //     const blob = new Blob(files);
        //     //console.log(blob);
        //     const url = URL.createObjectURL(blob);
        //     const data = [[files[0].name, url]];
        //     const length = data.length;
        //     dispatch({ type: "INIT_RECTS", length });
        //     dispatch({ type: "INIT_BOXES", length });
        //     dispatch({ type: "SET_LABELPROMPT", label: true });
        //     dispatch({ type: "SET_FILES", files: data });
        //     dispatch({ type: "SET_CURRENT_FILE_INDEX", index: 0 });
        // }
    }
}

export default ProcessImages;