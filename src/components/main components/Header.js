import React from "react";
import { Grid, Button } from '@mui/material';
import CustomButton from '../helper components/CustomButton';
import { useContext } from "react";
import { Context } from "../context/context";

const Header = (props) => {
    const { state, dispatch } = useContext(Context);
    return(
        <Grid
            container
            style={{
                width: "100%",
                height: 60,
                background: "#4f45b8",
            }}
            justifyContent="center"
            alignItems="center"
        >
            <p className="welcome__message"><h2>
                Welcome to the Object Detection platform!
            </h2></p> 
        </Grid>
    );
}

export default Header;