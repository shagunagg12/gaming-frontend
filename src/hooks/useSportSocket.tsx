// import { useEffect, useState, useCallback } from 'react';
// import io, { Socket } from 'socket.io-client';


// const SOCKET_URL = import.meta.env.VITE_API_URL; 


// export function useSportSocket() {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     const socketInstance = io(SOCKET_URL, {
//       transports: ['websocket'],
//       autoConnect: true, 
//     });

//     socketInstance.on('connect', () => {
//       setConnected(true);
//       socketInstance.emit('joinSports'); 
//     });

//     socketInstance.on('disconnect', () => {
//       console.log(`🔌 Disconnected from sports socket`);
//       setConnected(false);
      
//     });

//     setSocket(socketInstance);
//     socketInstance.connect();

//     return () => {
//       socketInstance.disconnect(); 
//     };
//   }, []);

//   // Emit events
//   const emitEvent = useCallback(
//     (eventName: string, data: any) => {
//       if (socket && connected) {
//         socket.emit(eventName, data);
//       }
//     },
//     [socket, connected]
//   );

//   // Listen to events
//   const onEvent = useCallback(
//     (eventName: string, callback: (...args: any[]) => void) => {
//       if (socket) {
//         socket.on(eventName, callback);
//       }
//     },
//     [socket]
//   );

//   return { socket, emitEvent, onEvent, connected };
// }
