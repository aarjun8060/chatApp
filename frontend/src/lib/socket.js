import io from "socket.io-client"
import { BackendURL } from "./constant";

const socket = io(BackendURL);

export default socket;