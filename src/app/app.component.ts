import { Component } from '@angular/core';

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

    constructor()
    {
        // components can be called from the imported UIkit reference
    }
}
