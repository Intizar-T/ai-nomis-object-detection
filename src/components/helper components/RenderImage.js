import { Image } from 'react-konva';

const RenderImage = ({ URL, imageSize }) => {
    const image = new window.Image();
    image.src = URL;
    // console.log("from RenderImage, imageSize:");
    // console.log(imageSize);
    return (
        <Image
            image={image}
            width={imageSize.width}
            height={imageSize.height}
        />
    );
};

export default RenderImage;