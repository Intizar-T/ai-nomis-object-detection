const DownloadImage = async (state) => {
  const link = document.createElement("a");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new window.Image();
  const curIndex = state.currentFileIndex;
  const curFile = state.files[curIndex];
  const curRect = state.rectangles[curIndex];
  const curHist = curRect.hist;
  const curHistLen = curHist.length - 1;
  const imgWidth = curFile[2].width;
  const imgHeight = curFile[2].height;

  img.src = curFile[1];

  const promise = new Promise((resolve, reject) => {
    img.onload = function () {
      try {
        const widthRatio = img.width / imgWidth;
        const heightRatio = img.height / imgHeight;
        console.log("DownloadImage widthRatio = " + widthRatio);
        console.log("DownloadImage heightRatio = " + heightRatio);
        canvas.height = img.height;
        canvas.width = img.width;

        context.drawImage(img, 0, 0);

        context.lineWidth = curRect.strokeWidth;
        context.strokeRect(
          curHist[curHistLen].x * widthRatio,
          curHist[curHistLen].y * heightRatio,
          curHist[curHistLen].width * widthRatio,
          curHist[curHistLen].height * heightRatio
        );
        resolve(canvas.toDataURL());
      } catch (err) {
        reject(err);
      }
    };
  });
  try {
    const uri = await promise;
    link.download = curIndex + ".png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.log(err);
  }
};

export default DownloadImage;
