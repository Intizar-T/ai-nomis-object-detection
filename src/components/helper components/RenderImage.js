import { Image } from 'react-konva';


const RenderImage = ({ URL, dispatch, state }) => {
    const image = new window.Image();
    //image.crossOrigin = 'Anonymous';
    image.src = URL;
    
    
    const handleLoad = () => {
        let imageWidth = image.width;
        let imageHeight = image.height;
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
            // width={imageWidth}
            // height={imageHeight}
            //crossOrigin='anonymous'
        />
    );
};

export default RenderImage;