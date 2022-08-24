import { useEffect, useContext, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Context } from "../context/context";
import DownloadImage from "../download/DownloadImage";
import Header from "./Header";
import Main from "./Main";
import InternalFooter from "./InternalFooter";
import OuterFooter from "./OuterFooter";
import ClassModal from "../helper components/ClassModal";
import Dropdown from "../helper components/Dropdown";
import LandingPage from "./LandingPage";
import ProcessImages from "../helper functions/ProcessImages";
import './../../styles/main components/App.css';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'

import COCO_SSD from "../helper functions/COCO-SSD"

const URL = 'wss://onedv62i9e.execute-api.ap-northeast-2.amazonaws.com/production'

function App() {
  const { state, dispatch } = useContext(Context);
  const stageRef = useRef(null);
  const socket = useRef(null);
  
  const [isConnected, setIsConnected] = useState(false);
  // const [bucketUrl, setBucketUrl] = useState("");
  	
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

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    DownloadImage(state, uri);
  };
  
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
  
  const onSocketOpen = useCallback(() => {
    setIsConnected(true);
    console.log("Connected to the WebSocket");
  }, []);
  
  const onSocketClose = useCallback(() => {
    setIsConnected(false);
    console.log("Disconnected from the Websocket");
  }, []);
  
  const onSocketMessage = useCallback(async (data) => {
    const url = await JSON.parse(data["data"]);
    // console.log(url['imageURLs'])
    // axios.get(url['imageURLs'])
    //   .then(res => {
    //       console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err); 
    //   });
    // setBucketUrl(url);
    ProcessImages(state, dispatch, url["imageURLs"], socket, true);
    // console.log("connection status now: "+ socket.current?.readyState)
    // console.log("trying to close the connection...");
    // socket.current?.close();
    // console.log("Connection closed: " + socket.current?.readyState);
  }, []);

  const onConnect = useCallback(() => {
    if(socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', onSocketOpen)
      socket.current.addEventListener('close', onSocketClose);
      socket.current.addEventListener('message', onSocketMessage);
    }
  }, []);
  
  useEffect(() => {
    if(isConnected) {
      console.log("Sending a request now...")
      socket.current?.send(JSON.stringify({
        "action": "getImages",
        "message": {
          "keyword": state.imageKeyword,
          "count": state.imageCount
        }
      }));
    }
  }, [isConnected]);
  
  // useEffect(() => {
  //   // const url = bucketUrl;
  //   if(bucketUrl !== ""){
  //     console.log(bucketUrl)
  //     axios.get(bucketUrl)
  //       .then((response) => {
  //         console.log("received smth");
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //     }
  // }, [bucketUrl]);

  return (
    <Card 
      className="w-screen h-screen"
      onMouseDown={(e) => checkDeselect(e)}  
    >
      {/*<CardHeader 
        className="mainHeader" 
        floated={false}
      >
        <Header />
      </CardHeader>
      */}
      
      <CardBody 
        className="mainBody"
      >
        {state.labelPrompt && (
          <ClassModal dispatch={dispatch} onConnect={onConnect}/>
        )}

          <Card className="canvas">
            {state.files.length > 0 ? (
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
            ) : (
              <CardHeader className='canvasHeaderInitial'>
                <Typography variant='h5'>Select or scrape your images!</Typography>
              </CardHeader>
            )}
            <CardBody
              className='canvasBody'
            >
              {state.files.length > 0 ? (
              <Main checkDeselect={checkDeselect} stageRef={stageRef}/>
              ) : (
                <LandingPage />
              )}
            </CardBody>
            <CardFooter
              divider
              className='canvasFooter'
            >
              <InternalFooter handleExport={handleExport}/>
            </CardFooter>
          </Card>
        
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
