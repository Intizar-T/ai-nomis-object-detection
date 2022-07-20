import React, { useEffect } from 'react';
import { useContext } from "react";
import Popup from "../helper components/Popup";
import ClassModal from "../helper components/ClassModal";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "../helper components/Rectangle"
import RenderImage from "../helper components/RenderImage";
import { Context } from "../context/context";
import {
    Typography
} from "@material-tailwind/react"

const Main = (props) => {
    const { state, dispatch } = useContext(Context);

    const updateHistory = () => {
        const curr_index = state.currentFileIndex;
        const rects = state.rectangles;
        const new_hist = {
            x: rects[curr_index].x,
            y: rects[curr_index].y,
            width: rects[curr_index].width,
            height: rects[curr_index].height,
        }
        rects[curr_index].hist.push(new_hist);

        dispatch({ type: "UPDATE_RECTS", rects: rects });
    }

    return(
        <Stage
            width={state.originalImageSize.width}
            height={state.originalImageSize.height}
            onMouseDown={(e) => props.checkDeselect(e)}
            onTouchStart={(e) => props.checkDeselect(e)}
            ref={props.stageRef}
            style={{
                margin: 10,
            }}
            name="canvas"
        >
            <Layer id="layer">
                <RenderImage URL={state.files[state.currentFileIndex][1]} dispatch={dispatch}/>
                <Rectangle
                    key={state.rectangles[state.currentFileIndex].id}
                    shapeProps={state.rectangles[state.currentFileIndex]}
                    isSelected={state.rectangles[state.currentFileIndex].id === state.selectedRectId}
                    onSelect={() => {
                        //console.log(state.rectangles[state.currentFileIndex].id);
                        dispatch({ type: "SET_SELECTED_RECT_ID", id: state.rectangles[state.currentFileIndex].id});
                        //console.log("current rect id = " + state.selectedRectId);
                    }}
                    onChange={(newAttrs) => {
                        updateHistory();
                        const rects = state.rectangles.slice();
                        rects[state.rectangles[state.currentFileIndex].id] = newAttrs;
                        dispatch({ type: "UPDATE_RECTS", rects });
                    }}
                    imgWidth={state.originalImageSize.width}
                    imgHeight={state.originalImageSize.height}
                />
            </Layer>
        </Stage>
    );
}

export default Main;