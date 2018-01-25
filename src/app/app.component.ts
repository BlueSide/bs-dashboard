import { Component } from '@angular/core';
import { WebSocketService } from './WebSocketService';
import { Database } from './Database';
import { environment } from '../environments/environment';

declare var UIkit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
    devBuild = environment.production;

    public appTitle: string = 'Blue Side Dashboard';
    public liveUpdate: boolean = true;

    private webSocketService: WebSocketService;
    private database: Database;
    
    constructor()
    {
        this.webSocketService = new WebSocketService();
        this.database = new Database();
    }
}
