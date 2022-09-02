import { useContext } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Context } from "../context/context";
import "./../../styles/helper components/Dropdown.css";

export default function Dropdown({ labels, rects, currentFileIndex }) {
  const { state, dispatch } = useContext(Context);
  return (
    <div className="dropdown">
      <Menu>
        <MenuHandler>
          <Button variant="gradient">Select Label</Button>
        </MenuHandler>
        <MenuList>
          {state.labels.map((val, i) => {
            return (
              <MenuItem
                key={i}
                value={val}
                onClick={() => {
                  rects[currentFileIndex].label = val;
                  dispatch({ type: "SET_BOX_LABEL", rects: rects });
                }}
              >
                {val}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}
