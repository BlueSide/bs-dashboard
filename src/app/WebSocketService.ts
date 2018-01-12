import { DataComponent, DataSet, DataType } from './DataComponent';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

export class WebSocketService
{
    private RECONNECT_INTERVAL: number = 1000; //milliseconds

    public static socket: WebSocket;
    public static dataResources: DataResource[];
    
    constructor()
    {
        WebSocketService.dataResources = [];
        this.connect();
    }

    
    public onOpen(event): void
    {
        for(let dataResource of WebSocketService.dataResources)
        {
            let payload: any = {
                type: "subscription",
                resource: dataResource.resource,
                query: dataResource.query,
                sourceType: dataResource.type,
            };

            WebSocketService.socket.send(JSON.stringify(payload));
        }
    }

    private connect()
    {
        WebSocketService.socket = new WebSocket(environment.websocketUri);

        WebSocketService.socket.addEventListener('open', this.onOpen.bind(this), false);
        WebSocketService.socket.addEventListener('close', this.onClose.bind(this), false);
        WebSocketService.socket.addEventListener('message', this.onMessage.bind(this), false);
        WebSocketService.socket.addEventListener('error', this.onWebSocketError.bind(this), false);
    }


    public static subscribe(dataSet: DataSet, dataComponent: DataComponent): void
    {
        // Add data set if a subscription for it already exists
        for(let dataResource of WebSocketService.dataResources)
        {
            if(dataResource.query === dataSet.query)
            {
                dataResource.dataComponents.push(dataComponent);
                return;
            }
        }

        // Create a new one if no query matches
        let dataResource: DataResource = {
            resource: dataSet.resource,
            query: dataSet.query,
            type: dataSet.type,
            dataComponents: [dataComponent]
        };
        
        WebSocketService.dataResources.push(dataResource);
    }
    
    private onClose(event): void
    {
        console.warn("Websocket Closed.", event);

        for(let dataResource of WebSocketService.dataResources)
        {
            for(let dataComponent of dataResource.dataComponents)
            {
                dataComponent.onClose();
            }
        }

        //FIXME: This is not working in a production build somehow
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
            console.log(data);
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
        for(let dataResource of WebSocketService.dataResources)
        {
            for(let dataComponent of dataResource.dataComponents)
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

export class DataResource
{
    resource: string;
    query: string;
    type: DataType;
    dataComponents: DataComponent[];
}
