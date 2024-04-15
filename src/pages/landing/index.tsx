/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import WebSocketService from "../../services/websockets/WebSocketService";

function Landing() {
  const [message, setMessage] = useState<any>("");
  const wsService = WebSocketService.getInstance("wss://fstream.binance.com"); // Change the URL to your WebSocket server
  const webSocket: any = useRef(null);
  useEffect(() => {
    webSocket.current = new WebSocket("wss://fstream.binance.com");
    webSocket.current.onmessage = (message: any) => {
      setMessage((prev: any) => [...prev, message.data]);
    };
    return () => webSocket.current.close();
  }, []);
  console.log("message :>> ", message);
  //   useEffect(() => {
  //     wsService.onMessage((message) => {
  //       setMessage(message);
  //     });

  //     wsService.onClose(() => {
  //       console.log("WebSocket connection closed");
  //       // Handle reconnection logic if needed
  //     });

  //     wsService.onError((error) => {
  //       console.error("WebSocket error:", error);
  //     });

  //     return () => {
  //       wsService.close();
  //     };
  //   }, [wsService]);
  return <div>Landing</div>;
}

export default Landing;
