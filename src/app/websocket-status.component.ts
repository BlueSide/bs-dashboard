import { Component } from '@angular/core';
import { WebSocketService } from './WebSocketService';

@Component({ 
    selector: 'websocket-status',
    templateUrl: 'websocket-status.component.html',
    styleUrls: ['websocket-status.component.scss']
})


export class WsStatusComponent
{
    private websocketOk: boolean = true;
    
    constructor()
    {
    }

    get isWebSocketOpen(): boolean
    {
        return WebSocketService.socket.readyState === 1;
    }
}
