"use client";
import WebSocketManager from "@/utils/wesocketManager";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface WebsocketContextProps {
  ready: boolean;
  value: string | null;
}

export const WebsocketContext = createContext<WebsocketContextProps>({
  ready: false,
  value: null,
});

export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  console.log("websocket provider rendered!");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    console.log("websocket provider useeffect");
    const ws = WebSocketManager.getInstance();

    /**
     * onopen Event Handler: This function is called when the WebSocket connection is successfully established.
     * It logs a message and sets the isReady state to true, indicating that the connection is active.​
     */
    ws.onopen = () => {
      console.log("socket opened!");
      setIsReady(true);
    };

    /*
     * onclose Event Handler: Triggered when the WebSocket connection is closed.
     * It logs a message and updates the isReady state to false, signaling that the connection has been terminated.​
     */
    ws.onclose = () => {
      console.log("socket closed!");
      setIsReady(false);
    };

    const messageHandler = (data: string) => {
      setValue(data);
    };

    WebSocketManager.addListener(messageHandler);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebsocketContext.Provider
      value={{
        ready: isReady,
        value: value,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}

// useWebsocket hook for consumer
export const useWebsocket = () => useContext(WebsocketContext);
