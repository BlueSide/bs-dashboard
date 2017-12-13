import { DataComponent, DataSet } from './DataComponent';
import { Observable } from 'rxjs/Rx';

export class WebSocketService
{
    //private readonly URI: string = "wss://blueside-sp-api.herokuapp.com/d";
    private URI: string = "ws://localhost:8080/d";
    private RECONNECT_INTERVAL: number = 1000; //milliseconds

    public static socket: WebSocket;
    //public static datasets: DataSet[];
    public static subscriptions: Subscription[];
    
    constructor()
    {
        WebSocketService.subscriptions = [];
        this.connect();
    }

    
    public onOpen(event): void
    {
        //TODO: Set WebSocket status component to OK or something
        console.log("Websocket Opened.");
        for(let subscription of WebSocketService.subscriptions)
        {
            let payload: any = {
                type: "subscription",
                resource: subscription.resource,
                query: subscription.query,
            };
            WebSocketService.socket.send(JSON.stringify(payload));
        }
    }

    private connect()
    {
        WebSocketService.socket = new WebSocket(this.URI);

        WebSocketService.socket.addEventListener('open', this.onOpen.bind(this), false);
        WebSocketService.socket.addEventListener('close', this.onClose.bind(this), false);
        WebSocketService.socket.addEventListener('message', this.onMessage.bind(this), false);
        WebSocketService.socket.addEventListener('error', this.onWebSocketError.bind(this), false);
    }


    public static subscribe(dataSet: DataSet, dataComponent: DataComponent)
    {
        // Add data set if a subscription for it already exists
        for(let subscription of WebSocketService.subscriptions)
        {
            if(subscription.query === dataSet.query)
            {
                subscription.dataComponents.push(dataComponent);
            }
        }

        // Create a new one if no query matches
        let subscription: Subscription = {
            resource: dataSet.resource,
            query: dataSet.query,
            dataComponents: [dataComponent]
        };
        
        WebSocketService.subscriptions.push(subscription);
    }
    
    private onClose(event): void
    {
        console.warn("Websocket Closed.", event);

        for(let subscription of WebSocketService.subscriptions)
        {
            for(let dataComponent of subscription.dataComponents)
            {
                dataComponent.onClose();
            }
        }

        //STUDY: Is this timer being cleaned up?
        //Retry the connection
        let timer = Observable.timer(this.RECONNECT_INTERVAL);
        timer.subscribe(this.connect.bind(this));
    }
    
    private onMessage(event): void
    {
        let data: any = JSON.parse(event.data);
        switch(data.type)
        {
        case "session_created":
            this.onSessionCreated(data);
            break;
        case "update":
            this.onUpdate(data.message);
            break;

        case "error":
            this.onErrorMessage(data);
            break;
        }
    }

    private onUpdate(data: any)
    {
        let message: any = JSON.parse(data);

        // Only update the actually updated dataset
        for(let subscription of WebSocketService.subscriptions)
        {
            for(let dataComponent of subscription.dataComponents)
            {
                dataComponent.onNewData(message);
            }
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
        console.log("Session created with ID: " + data.id);
    }   
}

export class Subscription
{
    resource: string;
    query: string;
    dataComponents: DataComponent[];
}
