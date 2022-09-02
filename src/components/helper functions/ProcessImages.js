import JSZip from "jszip";

const imageExtensions = ["jgp", "png", "gif", "ps", "jpeg", "webp"];

function getFileExtension(fname) {
  return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2);
}

function processFilename(p) {
  let names = p.split("/");
  let name = names.pop();
  if (name.slice(0, 2) === "._") {
    name = name.slice(2);
  }
  return name;
}

function unzip(files, dispatch) {
  const promise = JSZip.loadAsync(files).then(function (zip) {
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
          return [
            name,
            URL.createObjectURL(blob),
            { width: 0, height: 0 },
            { originalWidth: 0, originalHeight: 0 },
          ];
        });
      });

    return Promise.all(promises);
  });
  promise.then((data) => {
    const length = data.length;
    dispatch({ type: "INIT_RECTS", length });
    dispatch({ type: "INIT_BOXES", length });
    dispatch({ type: "SET_FILES", files: data });
    dispatch({ type: "SET_CURRENT_FILE_INDEX", index: 0 });
    dispatch({ type: "UPDATE_IMAGES_PROCESSED", processed: true });
  });
}

const ProcessImages = async (state, dispatch, e, socket, imagesScraped) => {
  dispatch({ type: "INIT_LABELS", labels: [] });
  if (imagesScraped) {
    const blob = new Blob([e.data], { type: "application/zip" });
    unzip(blob, dispatch);
  } else {
    const files = e.target.files;
    const fileExtension = getFileExtension(files[0].name);
    if (fileExtension === "zip") {
      unzip(files[0], dispatch);
    }

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
};

export default ProcessImages;
