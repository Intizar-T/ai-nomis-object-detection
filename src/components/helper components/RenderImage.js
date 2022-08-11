import { Image } from 'react-konva';


const RenderImage = ({ URL, dispatch, state }) => {
    const image = new window.Image();
    //image.crossOrigin = 'Anonymous';
    image.src = URL;
    
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
    
    const handleLoad = () => {
        dispatch({ type:'SET_ORIGINAL_IMAGE_SIZE', size:{
                width: imageWidth,
                height: imageHeight,
            } 
        });
    }
    image.addEventListener('load', handleLoad)
    return (
        <Image
            image={image}
            width={Math.min(image.width, imageWidth)}
            height={Math.min(image.height, imageHeight)}
            //crossOrigin='anonymous'
        />
    );
};

export default RenderImage;