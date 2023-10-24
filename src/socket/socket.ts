import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:1000';
const socket: Socket = io(URL);

export default socket;
