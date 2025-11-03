import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// Usage: const socket = useSocket();
export default function useSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    // Replace with your backend URL if needed
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      autoConnect: true,
    });
    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
}
