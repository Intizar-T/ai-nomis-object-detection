import { Typography } from "@material-tailwind/react";
import Dropdown from "../helper components/Dropdown";
import './../../styles/main components/InternalHeader.css';

const InternalHeader = ({ state, dispatch }) => {
    return(
        <div className='canvasHeader'>
            <Typography variant='h6' className='ml-2'>
              Label: {state.rectangles[state.currentFileIndex].label}
            </Typography>
            <Dropdown 
              labels={state.labels} 
              dispatch={dispatch}
              rects={state.rectangles} 
              currentFileIndex={state.currentFileIndex}
            />
        </div>
    );
}

export default InternalHeader;