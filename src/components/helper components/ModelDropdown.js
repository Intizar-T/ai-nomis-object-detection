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

export default function ModelDropdown() {
  const { state, dispatch } = useContext(Context);
  const models = ["coco-ssd", "mobilenet"];
  return (
    <div className="dropdown">
      <Menu>
        <MenuHandler>
          <Button variant="gradient">Select Model</Button>
        </MenuHandler>
        <MenuList>
          {models.map((val, i) => {
            return (
              <MenuItem
                key={i}
                value={val}
                onClick={() => {
                  dispatch({ type: "UPDATE_MODEL", model: val });
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
