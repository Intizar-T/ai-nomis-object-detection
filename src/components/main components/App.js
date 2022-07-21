import React, { useEffect, useContext } from "react";
import { Context } from "../context/context";
import DownloadImage from "../download/DownloadImage";
//import Header from "./Header";
import Main from "./Main";
import InternalFooter from "./InternalFooter";
import OuterFooter from "./OuterFooter";
import CustomButton from "../helper components/CustomButton";
import ProcessImages from "../helper functions/ProcessImages";
import ClassModal from "../helper components/ClassModal";
import Dropdown from "../helper components/Dropdown";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'

import Breakpoints from "../helper functions/Breakpoints";

function App() {
  const { state, dispatch } = useContext(Context);
  let fileLength = state.files.length;
  
	const stageRef = React.useRef(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    DownloadImage(state, uri);
  };

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
  }, [])

	useEffect(() => {
    fileLength = state.files.length;

		if(state.files.length > 0 && !state.labelPrompt) {

			if(state.rectangles[state.currentFileIndex].label === "not labeled"){
				dispatch({ type: "SET_POPUP", popup: true });
			}
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
        <Typography variant={Breakpoints(state.screenSize) === 'sm' ? 'h5' : 'h3'}>
          Welcome to object detection platform!
        </Typography>
      </CardHeader>
      
      <CardBody 
        className='w-screen h-full flex flex-row content-between items-center justify-center gap-4'
      >
         {state.labelPrompt && (
          <ClassModal dispatch={dispatch} />
        )}

        {fileLength > 0 ? (
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
                className='h-16 flex items-center justify-center border-2 border-blue-400'
              >
                <Dropdown 
                  labels={state.labels} 
                  dispatch={dispatch}
                  rects={state.rectangles} 
                  currentFileIndex={state.currentFileIndex} 
                  popup={state.popup}
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
            <label 
                htmlFor="dropzone-file" 
                className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <Typography variant={Breakpoints(state.screenSize) === 'sm' ? 'h5' : 'h3'}>
                      Click to upload
                    </Typography>
                    <Typography className={Breakpoints(state.screenSize) === 'sm' ? "text-sm dark:text-white" : "text-lg dark:text-white"}>
                      or drag and drop
                    </Typography>
                    <Typography className={Breakpoints(state.screenSize) === 'sm' ? "text-sm dark:text-white" : "text-lg dark:text-white"}>
                      Please, zip your images to upload!
                    </Typography>
                </div>
                <input 
                id="dropzone-file" 
                type="file" 
                className="hidden"  
                onChange={(e) => {
                    ProcessImages(state, dispatch, e.target.files);
                }}
                accept=".zip,.rar,.7zip"
                />
            </label>
          </Card>
        )}
      </CardBody>
      
      <CardFooter 
        divider
        className="flex flex-row items-center justify-center h-16" 
      >
        {fileLength > 0 ? (
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
