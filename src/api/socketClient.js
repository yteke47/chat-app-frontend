import { io } from "socket.io-client"

const SOCKET_ENDPOINT = "http://localhost:8080";

class SocketClient {
    constructor() {
        this.socket = io(SOCKET_ENDPOINT, {
            autoConnect: false
        });
    }

    connect() {
        if (!this.socket.connected) {
            this.socket.connect();
            console.log("Connected to chat socket services");
        } else {
            console.log("Already connected to chat socket services");
        }
    }

    authenticate(token) {
        this.emitEvent("authenticate", { token });
    }

    disconnect() {
        if (this.socket.connected)
            this.socket.disconnect();
        console.log("Disconnected from chat socket services");
    }

    emitEvent(ev, ...args) {
        this.socket.emit(ev, ...args, (err, val) => {
            if (err) {
                console.error(`Error in "${ev}" event: ${err}`);
            } else {
                console.log(`"${ev}" event acknowledgment: ${val}`);
            }
        });
    }

    on(ev, callback) {
        if (typeof ev === 'string' && typeof callback === 'function') {
            this.socket.on(ev, callback);
            console.log(`Event listener added for "${ev}"`);
        } else {
            console.error('Invalid parameters. Please provide a valid event name and callback function.');
        }
    }

    off(event) {
        if (typeof event !== 'string') {
          console.error('Invalid parameter. Please provide a valid event name (string).');
          return;
        }
      
        this.socket.removeAllListeners(event);
        console.log(`Event listener removed for "${event}"`);
      }
}

export default SocketClient;