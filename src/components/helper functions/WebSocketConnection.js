import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { Context } from "../context/context";

const WebSocketConnection = () => {
    const { state, dispatch } = useContext(Context);
    const [isConnected, setIsConnected] = useState(false);
    const sendLambdaRequest = isConnected && state.imageKeyword !== "" && state.imageCount !== 0;
    const socket = useRef(null);
    
    useEffect(() => {
        console.log("Sending a request now...")
        socket.current?.send(JSON.stringify({
          "action": "getImages",
          "message": {
            "keyword": state.imageKeyword,
            "count": state.imageCount
          }
        }));
    }, [sendLambdaRequest]);
    
    const onSocketOpen = useCallback((keyword, count) => {
        setIsConnected(true);
        console.log("Connected to the WebSocket");
    }, []);
      
    const onSocketClose = useCallback(() => {
        setIsConnected(false);
        console.log("Disconnected from the Websocket");
    }, []);
      
    const onSocketMessage = useCallback((data) => {
        const urls = JSON.parse(data["data"]);
        console.log(urls["imageURLs"]);
    }, []);
    
      
    if(socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', onSocketOpen)
      socket.current.addEventListener('close', onSocketClose);
      socket.current.addEventListener('message', onSocketMessage);
    }
}

export default WebSocketConnection;