const ResizeImages = async (state, dispatch) => {
  const maxSize = 200;
  let files = state.files;

  const promises = files.map((file, index) => {
    const image = new window.Image();
    image.src = file[1];
    return new Promise((resolve, reject) => {
      image.onload = function () {
        try {
          file[3].originalWidth = image.width;
          file[3].originalHeight = image.height;
          let imageWidth = 0,
            imageHeight = 0;
          if (image.width > maxSize || image.height > maxSize) {
            const ratio = image.width / image.height;
            if (image.width > maxSize) {
              imageWidth = maxSize;
              imageHeight = imageWidth / ratio;
            } else {
              imageHeight = maxSize;
              imageWidth = imageHeight * ratio;
            }
          }
          resolve({ width: imageWidth, height: imageHeight });
        } catch (err) {
          reject(err);
        }
      };
    });
  });

  try {
    const result = await Promise.all(promises);
    files.map((file, index) => {
      file[2] = result[index];
    });
    return files;
  } catch (err) {
    console.log(err);
  }
};

export default ResizeImages;
