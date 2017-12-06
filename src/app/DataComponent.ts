import { DashboardComponent } from './DashboardComponent';

export abstract class DataComponent extends DashboardComponent
{
    //TODO: How do we expose this to the designer?
    readonly query = "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer";

    private uri: string = "wss://blueside-sp-api.herokuapp.com/d";
    //private uri: string = "ws://localhost:8080/d";

    private socket: WebSocket;

    private id: string;
    protected dataQuery: string;
    
    protected abstract onUpdate(data: any): void;

    protected dataLoaded: boolean;

    constructor()
    {
        super();
        this.dataLoaded = false;
        this.dataQuery = this.query;

        this.socket = new WebSocket(this.uri);

        this.socket.addEventListener('open', this.onOpen.bind(this), false);
        this.socket.addEventListener('close', this.onClose.bind(this), false);
        this.socket.addEventListener('message', this.onMessage.bind(this), false);
        this.socket.addEventListener('error', this.onWebSocketError.bind(this), false);
    }
      
    public onOpen(event): void
    {
        //TODO: Set WebSocket status component to OK or something
        console.log("Websocket Opened.");
        
        // Subscribe to resource
        let payload: any = {
            type: "subscription",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: this.dataQuery            
        };
        event.target.send(JSON.stringify(payload));
    }
    
    private onClose(event): void
    {
        //TODO: Handle when the server is down
        console.log("Websocket Closed.", event);
    }
    
    private onMessage(event): void
    {
        let message: any = JSON.parse(event.data);
        switch(message.type)
        {
        case "session_created":
            this.onSessionCreated(message);
            break;
        case "update":
            this.dataLoaded = true
            this.onUpdate(JSON.parse(message.message));
            break;
        case "error":
            this.onErrorMessage(message.message);
            break;
        }
    }

    private onErrorMessage(message: string): void
    {
        console.error("The server responded with an error: ", message);
    }

    private onWebSocketError(event): void
    {
        console.error(event);
    }

    private onSessionCreated(data: any): void
    {
        this.id = data.id;
        console.log("Session created with ID: " + this.id);
    }

}
