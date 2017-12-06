export class WebSocketProvider
{
    //TODO: We only want one WebSocket connection with the API!!
    constructor()
    {
        this.socket = new WebSocket(this.uri);

        this.socket.addEventListener('open', this.onOpen.bind(this), false);
        this.socket.addEventListener('close', this.onClose.bind(this), false);
        this.socket.addEventListener('message', this.onMessage.bind(this), false);
        this.socket.addEventListener('error', this.onWebSocketError.bind(this), false);
    }

    
}
