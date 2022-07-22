import React, { useEffect, useContext } from "react";
import { Select, 
        Option, 
        Menu,
        MenuHandler,
        MenuList,
        MenuItem,
        Button } from "@material-tailwind/react";
import { Context } from "../context/context";

export default function Dropdown({ labels, rects, currentFileIndex, popup }) {
    const { state, dispatch } = useContext(Context);
    return (
        <div className="flex items-center justify-center z-40 mr-2">
            <Menu>
                <MenuHandler>
                    <Button variant="gradient">Select Label</Button>
                </MenuHandler>
                <MenuList>
                    {labels.map((val, i) => {
                        return (
                            <MenuItem 
                                key={i} 
                                value={val.toString()}
                                onClick={() => {
                                    //console.log(e)
                                    rects[currentFileIndex].label = val;
                                    dispatch({ type: "SET_BOX_LABEL", rects: rects }); 
                                    if(popup){
                                        dispatch({ type:"SET_POPUP", popup: false })
                                    }
                                }}
                            >
                                {val}
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Menu>

            {/* <Select 
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
                        <Option 
                            key={i} 
                            value={val.toString()}
                            //selected={rects[currentFileIndex].label === val ? true : false}
                        >{val}</Option>
                    )
                })}
            </Select> */}
        </div>
    )
}