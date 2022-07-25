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

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'

import Breakpoints from "../helper functions/Breakpoints";
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
        className="h-24 flex items-center justify-center border-2 border-blue-400" 
        floated={false}
      >
        <Header />
      </CardHeader>
      
      <CardBody 
        className='w-screen h-full flex flex-row content-between items-center justify-center gap-4'
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
            <Card className='h-fit, w-fit border-2 border-blue-400'>
              <CardHeader
                //color='blue'
                className='h-16 flex items-center justify-between border-2 border-blue-400'
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
                className='w-full h-full flex items-center justify-center'
              >
                <Main checkDeselect={checkDeselect} stageRef={stageRef}/>
              </CardBody>
              <CardFooter
                divider
                className='flex items-center justify-center space-x-2'
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
                //icon={<svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>}
            />
          </>
        ) : (
          <Card className="flex justify-center items-center w-full h-full">
            <LandingPage />
          </Card>
        )}
      </CardBody>
      
      <CardFooter 
        divider
        className="flex flex-row items-center justify-center h-16" 
      >
        {state.files.length > 0 ? (
          <OuterFooter />
        ) : (
          <Typography className={Breakpoints(state.screenSize) === 'sm' ? "text-sm dark:text-white" : "text-lg dark:text-white"}>
              Brought to you by AI-NOMIS's "NoCodingAI" team
          </Typography>
        )}
        
      </CardFooter>
    </Card>
  );
}

export default App;
