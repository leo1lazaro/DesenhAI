import axios from "axios";

export const api = axios.create({
  headers: {
    token: "NATHALIAEUTEAMO",
    "ngrok-skip-browser-warning": true
  }
});