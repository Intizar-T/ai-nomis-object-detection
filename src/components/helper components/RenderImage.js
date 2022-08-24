import { Image } from 'react-konva';
// import { useState } from "react";

const RenderImage = ({ URL, dispatch, state }) => {
    // const [imageSize, setImageSize] = useState({width: 200, height: 200});
    
    const image = new window.Image();
    //image.crossOrigin = 'Anonymous';
    image.src = URL;
    
    let imageWidth = 200, imageHeight = 200;
    const handleLoad = () => {
        imageWidth = image.width;
        imageHeight = image.height;
        const maxSize = 250;
        
        if(image.width > maxSize || image.height > maxSize) {
            const ratio = Math.floor(image.width / image.height);
            if(image.width > maxSize) {
                 imageWidth = maxSize;
                 imageHeight = imageWidth / ratio;
            } else {
                 imageHeight = maxSize;
                 imageWidth = imageHeight * ratio;
            }
        }
        // setImageSize({width: imageWidth, height: imageHeight});
        // dispatch({ type:'SET_ORIGINAL_IMAGE_SIZE', size:{
        //         width: imageWidth,
        //         height: imageHeight,
        //     } 
        // });
    }
    image.addEventListener('load', handleLoad)
    return (
        <Image
            image={image}
            width={imageWidth}
            height={imageHeight}
            //crossOrigin='anonymous'
        />
    );
};

export default RenderImage;