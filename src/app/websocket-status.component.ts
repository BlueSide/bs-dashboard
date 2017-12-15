import { Component } from '@angular/core';
import { WebSocketService } from './WebSocketService';

@Component({ 
    selector: 'websocket-status',
    template:
    '<span *ngIf="isWebSocketOpen"><span class="uk-margin-small-right" style="color: green;" uk-icon="icon: check"></span>Websocket OK</span>'
    + '<span *ngIf="!isWebSocketOpen"><span class="uk-margin-small-right" style="color: red;" uk-icon="icon: warning"></span>Websocket Closed</span>',
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
