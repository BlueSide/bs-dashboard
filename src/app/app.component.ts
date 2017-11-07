import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
    public appTitle: string = 'Blue Side Dashboard';
    public liveUpdate: boolean = true;

}
