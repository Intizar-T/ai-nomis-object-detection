import { useContext } from "react";
import { Context } from "../context/context";
import DownloadText from "../download/DownloadText";
import CustomButton from '../helper components/CustomButton';
//import StageZoom from '../helper functions/StageZoom';
import './../../styles/main components/InternalFooter.css'

const InternalFooter = ({ handleExport }) => {
    const { state, dispatch } = useContext(Context);
    // let stage = state.stage;
    // useEffect(() => {
    //     stage = state.stage;
    //     //console.log(stage);
    // }, [state.stage])

    const handleUndo = () => {
        const rects = state.rectangles;
        const curr_index = state.currentFileIndex;
        const hist = rects[curr_index].hist;
        if(hist.length === 0) {
            return;
        }
        const prev_box_coord = hist.pop();
        
        rects[curr_index].hist = hist;
        rects[curr_index].x = prev_box_coord.x;
        rects[curr_index].y = prev_box_coord.y;
        rects[curr_index].width = prev_box_coord.width;
        rects[curr_index].height = prev_box_coord.height;

        dispatch({ type: "UPDATE_RECTS", rects: rects });
    }

    return(
            <div>
                {/* Download Buttons */}
                <div className='downloadButtons'>
                    <CustomButton 
                        action={handleExport} 
                        text="Download" 
                    />
                    <CustomButton 
                        action={DownloadText} 
                        text="Download .txt" 
                        pass_state={true} 
                    />
                </div>

                {/* Prev, Next, Undo, Zoom in & out buttons */}
                <div className='undoButton'>
                    {/* <CustomButton 
                        action={() => {
                            if(stage !== null){
                                StageZoom(null, stage, 1);
                            } 
                        }} 
                        text="+" 
                    /> */}
                     <CustomButton 
                        action={() => {handleUndo()}} 
                        text="UNDO"
                    />
                    {/* <CustomButton 
                        action={() => {
                            if(stage !== null){
                                StageZoom(null, stage, -1);
                            }
                        }} 
                        text="-"
                    /> */}
                </div>
            </div>
    );
}

export default InternalFooter;