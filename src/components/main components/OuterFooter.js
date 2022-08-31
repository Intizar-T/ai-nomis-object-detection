import { useContext, useRef } from "react";
import { Context } from "../context/context";
import CustomButton from '../helper components/CustomButton';
import DownloadAll from '../download/DownloadAll';
import DownloadAllText from '../download/DownloadAllText';
import ProcessImages from "../helper functions/ProcessImages"
import './../../styles/main components/OuterFooter.css';
import './../../styles/helper components/CustomButton.css'

const OuterFooter = () => {
    const { state, dispatch } = useContext(Context);
    const hiddenFileInput = useRef(null);

    return (
        state.files.length > 0 ? (
            <div className="buttonsDiv">
                <input 
                    type="file" 
                    className="hidden"  
                    onChange={(e) => {
                        ProcessImages(state, dispatch, e, false);
                    }}
                    accept=".zip,.rar,.7zip,.jpg,.png,.gif,.ps,.jpeg,.webp"
                    ref={hiddenFileInput}
                />
                <CustomButton
                    action={() => {
                        hiddenFileInput.current.click();
                    }}
                    text="Upload Images"
                    color="green"
                />
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
            <div>
                <CustomButton 
                    action={() => {
                            dispatch({ type: "SET_LABELPROMPT", label: true });
                        }
                    }
                    text="Scrape Images"
                    color="green"
                />
            </div>
        )
        
    );
}

export default OuterFooter;