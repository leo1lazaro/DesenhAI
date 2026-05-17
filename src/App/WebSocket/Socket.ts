import { io } from "socket.io-client";

export const socket = io({
  autoConnect: false,
  transports: ["websocket", "polling"],
  extraHeaders: {
    "ngrok-skip-browser-warning": "true"
  }
});
