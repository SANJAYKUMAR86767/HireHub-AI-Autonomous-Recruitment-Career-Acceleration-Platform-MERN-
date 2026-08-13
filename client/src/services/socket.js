import { io } from "socket.io-client";

let socket = null;

export function connectSocket(token) {
  if (socket) return socket;
  const url = import.meta.env.VITE_SOCKET_URL;
  if (!url) {
    // If no external socket server is specified in production, stay idle
    return null;
  }
  try {
    socket = io(url, {
      auth: { token },
      autoConnect: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
    });
    socket.on("connect_error", () => {
      // Silent error handler for disconnected environments
    });
  } catch (e) {
    console.warn("Socket disabled or offline");
  }
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
