import { useContext } from "react";
import { Context } from "../context/context";
import CustomButton from '../helper components/CustomButton';
import DownloadAll from '../download/DownloadAll';
import DownloadAllText from '../download/DownloadAllText';
import Breakpoints from "../helper functions/Breakpoints";
import { Typography } from '@material-tailwind/react'
import './../../styles/main components/OuterFooter.css'

const OuterFooter = () => {
    const { state, dispatch } = useContext(Context);

    return (
        state.files.length > 0 ? (
            <div className="buttonsDiv">
               <CustomButton
                    action={() => {
                        DownloadAll(state, dispatch, false);
                    }}
                    text = "Download All"
                    color="green"
               />
               <CustomButton
                     action={() => DownloadAllText(state)}
                     text = "Download All .txt"
                     color="green"
               />
                <CustomButton
                    action={() => {
                            dispatch({ type: "SET_LABELPROMPT", label: true });
                        }
                    }
                    text="Scrape Images"
                    color="green"
                />
            </div>
        ) : (
            <CustomButton 
                action={() => {
                        dispatch({ type: "SET_LABELPROMPT", label: true });
                    }
                }
                text="Scrape Images"
                color="green"
            />
        )
        
    );
}

export default OuterFooter;