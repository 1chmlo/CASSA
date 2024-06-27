// WebSocketContext.js
import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("imageVerified", (res) => {
      setResponse(res);
    });

    return () => {
      socket.off("imageVerified");
    };
  }, []);

  return (
    <WebSocketContext.Provider value={response}>
      {children}
    </WebSocketContext.Provider>
  );
};
