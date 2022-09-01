const DownloadText = (state) => {
  const currIndex = state.currentFileIndex;
  const currFile = state.files[currIndex];
  const originalImgSize = currFile[3];
  const currImgSize = currFile[2];
  const widthRatio = originalImgSize.originalWidth / currImgSize.width;
  const heightRatio = originalImgSize.originalHeight / currImgSize.height;

  const currRect = state.rectangles[currIndex];
  const coord = {
    x: currRect.x * widthRatio,
    y: currRect.y * heightRatio,
    width: currRect.width * widthRatio,
    height: currRect.height * heightRatio,
    label: currRect.label,
  };
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(coord)], { type: "application/json" });
  element.href = URL.createObjectURL(file);
  element.download = currIndex + "_coordinates.json";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element);
};

export default DownloadText;
