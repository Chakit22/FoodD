"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Ordertracking() {
  const [message, setMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected to WebSocket server!");
    };

    socket.onmessage = (event) => {
      // console.log(event);
      // Handle incoming messages from the WebSocket server
      setMessage(event.data);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setWs(socket);

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      if (ws) {
        console.log("Hey there");
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send("Hello !");
    }
  };

  return (
    <div>
      <h2>WebSocket Demo</h2>
      <p>Received from WebSocket: {message}</p>
    </div>
  );
}
