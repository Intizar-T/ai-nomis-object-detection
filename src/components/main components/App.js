import React, { useEffect, useContext } from "react";
import { Context } from "../context/context";
import DownloadImage from "../download/DownloadImage";
import Header from "./Header";
import Main from "./Main";
import InternalFooter from "./InternalFooter";
import OuterFooter from "./OuterFooter";
import CustomButton from "../helper components/CustomButton";
import ClassModal from "../helper components/ClassModal";
import Dropdown from "../helper components/Dropdown";
import LandingPage from "./LandingPage";
//import StageZoom from "../helper functions/StageZoom";
import './../../styles/main components/App.css'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'

import COCO_SSD from "../helper functions/COCO-SSD"

function App() {
  const { state, dispatch } = useContext(Context);
  const stageRef = React.useRef(null);
	
	useEffect(() => {
	  COCO_SSD(state, dispatch);
	}, [state.files]);

  /* attach a zoom in/out callback to the stage
   every time a stage changes */
  useEffect(() => {
    if(stageRef.current !== null){
      const stage = stageRef.current;
      //console.log(stage.width());
      dispatch({ type: "SET_STAGE", stage: stage });

      /* stage.on('wheel', (e) => {
        e.evt.preventDefault();
        StageZoom(e, stage, 0);
      }); */
      
      dispatch({ type:'SET_STAGE_SIZE', size:{
          width: stage.width(),
          height: stage.height(),
        } 
      });
    }
  }, [stageRef.current]);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    DownloadImage(state, uri);
  };

  /* Change the window size in the state every time
  the window resizes (for responsiveness) -> needs to be
  reimplemented in a better way! */
  useEffect(() => { 
    function handleResize() {
      dispatch({ type:"SET_SCREEN_SIZE", size:{
          width: window.innerWidth,
          height: window.innerHeight,
        }})
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const checkDeselect = (e) => {
    try {
      const stage = e.target.getStage();
      const rects = stage.find('Rect');
		  const isRect = (rects.includes(e.target));
        
      if (!isRect) {
        dispatch({ type:"SET_SELECTED_RECT_ID", id: null })
      }
    } catch(error) {
      if(!(e.target.nodeName === "CANVAS")) {
        dispatch({ type:"SET_SELECTED_RECT_ID", id: null })
      }
    }
  }

  return (
    <Card 
      className="w-screen h-screen"
      onMouseDown={(e) => checkDeselect(e)}  
    >
      <CardHeader 
        className="mainHeader" 
        floated={false}
      >
        <Header />
      </CardHeader>
      
      <CardBody 
        className="mainBody"
      >
         {state.labelPrompt && (
          <ClassModal dispatch={dispatch} />
        )}

        {state.files.length > 0 ? (
          <>
            <CustomButton 
              action={() => {}} 
              text="PREV" 
              pass_dispatch={true} 
              dispatch_info={{type: "PREV_FILE"}}
              color="orange"
              id="prevButton"
            />
            <Card className="canvas">
              <CardHeader
                className='canvasHeader'
              >
                <Typography variant='h6' className='ml-2'>
                  Label: {state.rectangles[state.currentFileIndex].label}
                </Typography>
                <Dropdown 
                  labels={state.labels} 
                  dispatch={dispatch}
                  rects={state.rectangles} 
                  currentFileIndex={state.currentFileIndex}
                />
              </CardHeader>
              <CardBody
                className='canvasBody'
              >
                <Main checkDeselect={checkDeselect} stageRef={stageRef}/>
              </CardBody>
              <CardFooter
                divider
                className='canvasFooter'
              >
                <InternalFooter handleExport={handleExport}/>
              </CardFooter>
            </Card>
            <CustomButton 
                action={() => {}} 
                text="NEXT" 
                pass_dispatch={true} 
                dispatch_info={{type: "NEXT_FILE"}}
                color="orange"
                id="nextButton"
              />
          </>
        ) : (
          <Card className="landingPage">
            <LandingPage />
          </Card>
        )}
      </CardBody>
      
      <CardFooter 
        divider
        className="mainFooter" 
      >
        <OuterFooter />
      </CardFooter>
    </Card>
  );
}

export default App;
