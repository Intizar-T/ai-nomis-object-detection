import { useContext } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "../helper components/Rectangle";
import RenderImage from "../helper components/RenderImage";
import { Context } from "../context/context";

const Main = (props) => {
  const { state, dispatch } = useContext(Context);

  const updateHistory = () => {
    const curr_index = state.currentFileIndex;
    const rects = state.rectangles;
    const new_hist = {
      x: rects[curr_index].x,
      y: rects[curr_index].y,
      width: rects[curr_index].width,
      height: rects[curr_index].height,
    };
    rects[curr_index].hist.push(new_hist);

    dispatch({ type: "UPDATE_RECTS", rects: rects });
  };

  const curIndex = state.currentFileIndex;
  const curFile = state.files[curIndex];
  const curRects = state.rectangles[curIndex];
  const curImageWidth = curFile[2].width;
  const stageWidth = curImageWidth + 1;
  const curImageHeight = curFile[2].height;
  const stageHeight = curImageHeight + 1;
  const URL = curFile[1];

  return (
    <Stage
      width={stageWidth}
      height={stageHeight}
      onMouseDown={(e) => props.checkDeselect(e)}
      onTouchStart={(e) => props.checkDeselect(e)}
      ref={props.stageRef}
      style={{
        margin: 10,
      }}
    >
      <Layer>
        <RenderImage URL={URL} imageSize={curFile[2]} />
        <Rectangle
          key={curRects.id}
          shapeProps={curRects}
          isSelected={curRects.id === state.selectedRectId}
          onSelect={() => {
            dispatch({
              type: "SET_SELECTED_RECT_ID",
              id: curRects.id,
            });
          }}
          onChange={(newAttrs) => {
            updateHistory();
            const rects = state.rectangles.slice();
            rects[curRects.id] = newAttrs;
            dispatch({ type: "UPDATE_RECTS", rects });
          }}
          stageWidth={stageWidth}
          stageHeight={stageHeight}
        />
      </Layer>
    </Stage>
  );
};

export default Main;
