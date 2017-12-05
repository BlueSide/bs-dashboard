//TODO: Websocket handling should be in some kind of service, not in a reusable component!

export abstract class DashboardComponent
{
    //private uri: string = "wss://blueside-sp-api.herokuapp.com/d";
    private uri: string = "ws://localhost:8080/d";
    private socket: WebSocket;

    private id: string;
    protected dataQuery;
    
    protected abstract onUpdate(data: any);

    constructor()
    {
        this.socket = new WebSocket(this.uri);

        this.socket.addEventListener('open', this.onOpen.bind(this), false);
        this.socket.addEventListener('close', this.onClose.bind(this), false);
        this.socket.addEventListener('message', this.onMessage.bind(this), false);
        this.socket.addEventListener('error', this.onWebSocketError.bind(this), false);
    }
  
    public onOpen(event)
    {
        //TODO: Set WebSocket status component to OK or something
        console.log("Websocket Opened.");
        
        // Send webhook subscription request
        let payload: any = {
            type: "subscription",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: this.dataQuery,
            
        };
        event.target.send(JSON.stringify(payload));
    }
    
    private onClose(event)
    {
        //TODO: Handle when the server is down
        console.log("Websocket Closed.", event);
    }
    
    private onMessage(event)
    {
        let message: any = JSON.parse(event.data);
        switch(message.type)
        {
        case "session_created":
            this.onSessionCreated(message);
            break;
        case "update":
            this.onUpdate(JSON.parse(message.message));
            break;
        case "error":
            this.onErrorMessage(message.message);
            break;
        }
    }

    private onErrorMessage(message: string)
    {
        console.error("The server responded with an error: ", message);
    }

    private onWebSocketError(event)
    {
        console.error(event);
    }

    private onSessionCreated(data: any)
    {
        this.id = data.id;
        console.log("Session created with ID: " + this.id);
    }
    
    
}
