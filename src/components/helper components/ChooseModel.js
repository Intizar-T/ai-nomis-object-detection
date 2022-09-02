import { useState, useContext, useEffect } from "react";
import { Context } from "../context/context";
import { Dialog } from "@mui/material";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const ChooseModel = () => {
  const { state, dispatch } = useContext(Context);
  const [model, setModel] = useState("");
  const models = ["coco-ssd", "mobilenet"];

  //   useEffect(() => {
  //     dispatch({ type: "UPDATE_MODEL", model: model });
  //   }, [model]);

  return (
    <Dialog open={true}>
      <DialogHeader>Choose Model:</DialogHeader>
      <DialogBody>
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
                    setModel(val);
                  }}
                >
                  {val}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => {
            dispatch({ type: "UPDATE_MODEL", model: model });
          }}
        >
          OK
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ChooseModel;
