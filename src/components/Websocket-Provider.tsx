"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface WebsocketContextProps {
  ready: boolean;
  value: string | null;
  send:
    | ((
        data: string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>
      ) => void)
    | undefined;
}

export const WebsocketContext = createContext<WebsocketContextProps>({
  ready: false,
  value: null,
  send: (() => {}) | undefined;
});

export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (event) => setValue(event.data);

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const x = ws.current?.send.bind(ws.current);

  const ret = [isReady, value, ws.current?.send.bind(ws.current)];

  return (
    <WebsocketContext.Provider
      value={{
        ready: isReady,
        value: value,
        send: ws.current?.send.bind(ws.current),
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}

// useWebsocket hook for consumer
export const useWebsocket = () => useContext(WebsocketContext);
