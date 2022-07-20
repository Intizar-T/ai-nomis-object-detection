import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

export default function Dropdown({ labels, dispatch, rects, currentFileIndex, popup }) {
    //const [label, setLabel] = useState(0);
    return (
        <div className="fixed flex items-center justify-center z-40">
             <Select 
                success
                label="Select Label"
				onChange={(value) => {
                    //console.log(e)
					rects[currentFileIndex].label = value;
					dispatch({ type: "SET_BOX_LABEL", rects: rects }); 
                    if(popup){
                        dispatch({ type:"SET_POPUP", popup: false })
                    }
				}}
                className='bg-white'
            >
                {labels.map((val, i) => {
                    return (
                        <Option key={i} value={val.toString()}>{val}</Option>
                    )
                })}
            </Select>
        </div>
    )
}