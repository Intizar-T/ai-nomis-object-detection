import React from 'react';
import { useContext } from "react";
import { Context } from "../context/context";
import DownloadText from "../download/DownloadText";
import ProcessImages from "../helper functions/ProcessImages";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "./Rectangle"
import DownloadImage from "../download/DownloadImage";
import { Button } from '@material-tailwind/react'
import Breakpoints from '../helper functions/Breakpoints';

const CustomButton = (props) => {
    const { state, dispatch } = useContext(Context);
    const size = Breakpoints(state.screenSize);
    //console.log(size);
    return(
        <Button 
            variant='filled' 
            size='lg'
            color={props.color}
            className='text-white font-bold py-2 px-4 rounded'
            onClick={(e) => {
                if(state.popup || state.labelPrompt){
                    state.popup ? 
                    alert("Please, choose a label!") :
                    alert("Please, provide the number of classes");
                }
                else {
                    if(props.pass_state){
                        props.action(state);
                    }
                    else if(props.pass_dispatch){
                        dispatch(props.dispatch_info);
                    }
                    else{
                        props.action();
                    }
                }
            }}
            //style={props.style}
            id={props.id}
        >
            {props.text}
            {props.icon}
        </Button>

    );
}

export default CustomButton;