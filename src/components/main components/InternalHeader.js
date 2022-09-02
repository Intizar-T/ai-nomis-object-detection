import { Typography } from "@material-tailwind/react";
import LabelDropdown from "../helper components/LabelDropdown";
import "./../../styles/main components/InternalHeader.css";

const InternalHeader = ({ state, dispatch }) => {
  return state.model === "coco-ssd" ? (
    <div className="canvasHeader">
      <Typography variant="h6" className="ml-2">
        Label: {state.rectangles[state.currentFileIndex].label}
      </Typography>
      <LabelDropdown
        labels={state.labels}
        dispatch={dispatch}
        rects={state.rectangles}
        currentFileIndex={state.currentFileIndex}
      />
    </div>
  ) : (
    <div className="canvasHeader">
      <Typography variant="h6" className="ml-2">
        Label: {state.mobilenetResults.className}
      </Typography>
      <Typography variant="h6" className="ml-2">
        Accuracy: {state.mobilenetResults.probability}
      </Typography>
    </div>
  );
};

export default InternalHeader;
