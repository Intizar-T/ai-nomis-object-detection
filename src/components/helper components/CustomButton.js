import { useContext } from "react";
import { Context } from "../context/context";
import { Button } from '@material-tailwind/react'
import './../../styles/helper components/CustomButton.css'

const CustomButton = (props) => {
    const { state, dispatch } = useContext(Context);
    return(
        <Button 
            variant='filled' 
            size='lg'
            color={props.color}
            className="customButton"
            onClick={(e) => {
                if(props.pass_state){
                    props.action(state);
                }
                else if(props.pass_dispatch){
                    dispatch(props.dispatch_info);
                }
                else{
                    props.action();
                }
            }}
            id={props.id}
        >
            {props.text}
            {props.icon}
        </Button>

    );
}

export default CustomButton;