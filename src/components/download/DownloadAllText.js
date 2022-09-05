const DownloadAllText = (state) => {
  let coordArr = [];
  if (state.model === "coco-ssd") {
    let coord = {};
    let currRect = null;
    let originalImgSize = 0,
      currImgSize = 0,
      widthRatio = 0,
      heightRatio = 0;
    for (let i = 0; i < state.files.length; i++) {
      originalImgSize = state.files[i][3];
      currImgSize = state.files[i][2];
      widthRatio = originalImgSize.originalWidth / currImgSize.width;
      heightRatio = originalImgSize.originalHeight / currImgSize.height;

      currRect = state.rectangles[i];
      coord = {
        x: currRect.x * widthRatio,
        y: currRect.y * heightRatio,
        width: currRect.width * widthRatio,
        height: currRect.height * heightRatio,
        label: currRect.label,
        imageName: i,
      };
      coordArr.push(coord);
    }
  } else if (state.model === "mobilenet") {
    coordArr = state.mobilenetResults;
    coordArr.map((coord, index) => {
      coord["imageName"] = index;
    });
  }

  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(coordArr)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = "All_Image_Coordinates.json";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element);
};

export default DownloadAllText;
