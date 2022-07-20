import React from 'react';
//import { useContext } from 'react';
import { Image } from 'react-konva';
//import { Context } from '../context/context';

const RenderImage = ({ URL, dispatch }) => {
    //const { state, dispatch } = useContext(Context);

    const image = new window.Image();
    image.src = URL;
    const handleLoad = () => {
        dispatch({ type:'SET_ORIGINAL_IMAGE_SIZE', size:{
            width: image.width,
            height: image.height,
        } })
        //console.log(image.height + ", " + image.width);
    }
    image.addEventListener('load', handleLoad)
    return (
        <Image
            image={image}
        />
    );
};

export default RenderImage;