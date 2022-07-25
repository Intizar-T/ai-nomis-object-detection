import { useContext } from "react";
import { Menu,
        MenuHandler,
        MenuList,
        MenuItem,
        Button } from "@material-tailwind/react";
import { Context } from "../context/context";

export default function Dropdown({ labels, rects, currentFileIndex }) {
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
                                    rects[currentFileIndex].label = val;
                                    dispatch({ type: "SET_BOX_LABEL", rects: rects }); 
                                }}
                            >
                                {val}
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Menu>
        </div>
    )
}