import React, {createContext, useMemo, useContext} from "react";
import {io} from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket = ()=>{ 
    const socket = useContext(SocketContext)
    return socket

}

//a provider that give the access of sockets to complete react app
export const SocketProvider = (props)=>{
    const socket = useMemo(() => io('https://zoom-in-backend.onrender.com/', {
        transports: ["polling", "websocket"]
      }), []);
return (
    <SocketContext.Provider value={socket}>
        {props.children}
    </SocketContext.Provider>
)
} 