import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent
{
    devBuild = environment.production;
}
