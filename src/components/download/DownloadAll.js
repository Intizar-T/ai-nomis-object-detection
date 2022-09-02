import JSZipUtils from "jszip-utils";
import { saveAs } from "save-as";

const DownloadAll = async (state, dispatch, forDetection) => {
  const JSZip = require("jszip");
  let zip = new JSZip();
  const zipFileName = "Labeled_Object_Images.zip";
  const filesLength = state.files.length;

  const promises = state.files.map((file, index) => {
    const imgWidth = file[2].width;
    const imgHeight = file[2].height;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = new window.Image();
    img.src = file[1];

    return new Promise((resolve, reject) => {
      img.onload = function () {
        try {
          const widthRatio = img.width / imgWidth;
          const heightRatio = img.height / imgHeight;

          canvas.height = img.height;
          canvas.width = img.width;

          context.drawImage(img, 0, 0);
          try {
            if (!forDetection) {
              const rect = state.rectangles[index];
              context.lineWidth =
                rect.strokeWidth * Math.min(widthRatio, heightRatio);
              context.strokeRect(
                rect.x * widthRatio,
                rect.y * heightRatio,
                rect.width * widthRatio,
                rect.height * heightRatio
              );
            }
          } catch (err) {
            console.log(err);
          }
          resolve([file[0], canvas.toDataURL()]);
        } catch (err) {
          reject(err);
        }
      };
    });
  });

  try {
    const result = await Promise.all(promises);
    result.forEach(function (url, i) {
      let imageName = url[0];
      if (forDetection) {
        dispatch({ type: "UPDATE_IMAGE_URLS", URLs: url[1] });
      } else {
        JSZipUtils.getBinaryContent(url[1], function (err, data) {
          if (err) {
            console.log("Error while Downloading all images: \n" + err);
            alert("Error occured while downloading all images");
          } else {
            zip.file(imageName, data, { binary: true });
            if (i === filesLength - 1) {
              zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, zipFileName);
              });
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export default DownloadAll;
