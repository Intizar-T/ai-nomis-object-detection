import React from 'react';
import { useContext } from "react";
import { Context } from "../context/context";
import DownloadText from "../download/DownloadText";
import ProcessImages from "../helper functions/ProcessImages";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "../helper components/Rectangle"
import DownloadImage from "../download/DownloadImage";
//import { Grid, Button } from '@mui/material';
import CustomButton from '../helper components/CustomButton';
import { Card, Button, Input } from '@material-tailwind/react';

const InternalFooter = ({ handleExport }) => {
    const { state, dispatch } = useContext(Context);

    const handleUndo = () => {
        const rects = state.rectangles;
        const curr_index = state.currentFileIndex;
        const hist = rects[curr_index].hist;
        if(hist.length === 0) {
            return;
        }
        const prev_box_coord = hist.pop();
        
        // update the rectangle state after undo
        rects[curr_index].hist = hist;
        rects[curr_index].x = prev_box_coord.x;
        rects[curr_index].y = prev_box_coord.y;
        rects[curr_index].width = prev_box_coord.width;
        rects[curr_index].height = prev_box_coord.height;

        dispatch({ type: "UPDATE_RECTS", rects: rects });
    }

    return(
            <div>
                {/* Download Buttons */}
                <div className='flex items-center justify-center gap-1 mb-2'>
                    <CustomButton 
                        action={handleExport} 
                        text="Download" 
                    />
                    <CustomButton 
                        action={DownloadText} 
                        text="Download .txt" 
                        pass_state={true} 
                    />
                </div>

                {/* Prev, Next, Undo, Zoom in & out buttons */}
                <div className='flex items-center justify-center gap-1'>
                    <CustomButton 
                        action={() => {}} 
                        text="+" 
                    />
                     <CustomButton 
                        action={() => {handleUndo()}} 
                        text="UNDO"
                    />
                    <CustomButton 
                        action={() => {}} 
                        text="-"
                    />
                </div>
            </div>
    );
}

export default InternalFooter;