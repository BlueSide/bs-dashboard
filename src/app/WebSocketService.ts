import { Injectable } from '@angular/core';
import { DataComponent } from './DataComponent';

@Injectable()
export class WebSocketService
{
    //private readonly uri: string = "wss://blueside-sp-api.herokuapp.com/d";
    private static socket: WebSocket;
    private uri: string = "ws://localhost:8080/d";

    private static subscriptions: DataComponent[];
    
    constructor()
    {
        WebSocketService.subscriptions = [];
        WebSocketService.socket = new WebSocket(this.uri);

        WebSocketService.socket.addEventListener('open', this.onOpen.bind(this), false);
        WebSocketService.socket.addEventListener('close', this.onClose.bind(this), false);
        WebSocketService.socket.addEventListener('message', this.onMessage.bind(this), false);
        WebSocketService.socket.addEventListener('error', this.onWebSocketError.bind(this), false);
    }

    
    public onOpen(event): void
    {
        //TODO: Set WebSocket status component to OK or something
        console.log("Websocket Opened.");

        for(let subscription of WebSocketService.subscriptions)
        {
            // Subscribe to resource
            let payload: any = {
                type: "subscription",
                resource: subscription.resource,
                query: subscription.query,
            };
            WebSocketService.socket.send(JSON.stringify(payload));
        }
    }


    public static subscribe(dc: DataComponent)
    {
        WebSocketService.subscriptions.push(dc);
    }
    
    private onClose(event): void
    {
        //TODO: Handle when the server is down
        console.warn("Websocket Closed.", event);
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
            let message: any = JSON.parse(data.message);

            for(let dc of WebSocketService.subscriptions)
            {
                if(dc.resource === message.resource)
                {
                    dc.onNewData(message);
                }
            }

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
        console.log("Session created with ID: " + data.id);
    }
    
}
