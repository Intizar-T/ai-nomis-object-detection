import { Image } from "react-konva";

const RenderImage = ({ URL, imageSize }) => {
  const image = new window.Image();
  image.src = URL;
  const imageWidth = imageSize.width;
  const imageHeight = imageSize.height;
  //   const x = (imageWidth + 3) / 2;
  //   const y = (imageHeight + 3) / 2;
  return (
    <Image
      image={image}
      width={imageWidth}
      height={imageHeight}
      x={0.5}
      y={0.5}
    />
  );
};

export default RenderImage;
