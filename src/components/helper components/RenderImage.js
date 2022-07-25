import { Image } from 'react-konva';

const RenderImage = ({ URL, dispatch }) => {
    const image = new window.Image();
    image.src = URL;
    const handleLoad = () => {
        dispatch({ type:'SET_ORIGINAL_IMAGE_SIZE', size:{
                width: image.width,
                height: image.height,
            } 
        });
    }
    image.addEventListener('load', handleLoad)
    return (
        <Image
            image={image}
        />
    );
};

export default RenderImage;