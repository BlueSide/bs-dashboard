import { Component } from '@angular/core';
import { WebSocketService } from './WebSocketService';

declare var UIkit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
    public appTitle: string = 'Blue Side Dashboard';
    public liveUpdate: boolean = true;

    private webSocketService: WebSocketService;
    
    constructor()
    {
        this.webSocketService = new WebSocketService();
    }
}
