import { useContext } from "react";
import { Context } from "../context/context";
import { Typography } from "@material-tailwind/react";
import Breakpoints from "../helper functions/Breakpoints";

const OuterHeader = (props) => {
    const { state, dispatch } = useContext(Context);
    return(
        <Typography variant={Breakpoints(state.screenSize) === 'sm' ? 'h5' : 'h3'}>
            Welcome to object detection platform!
        </Typography>

    );
}

export default OuterHeader;