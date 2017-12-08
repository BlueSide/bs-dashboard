import { OnInit } from '@angular/core';
import { DashboardComponent } from './DashboardComponent';
import { WebSocketService } from './WebSocketService';

export abstract class DataComponent extends DashboardComponent implements OnInit
{
    //TODO: How do we expose this to the designer?
    public readonly query = "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer";
    public readonly resource = "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')";

    protected dataQuery: string;
    protected dataLoaded: boolean;

    protected abstract onUpdate(data: any): void;

    constructor()
    {
        super();
        this.dataQuery = this.query;
        this.dataLoaded = false;
        WebSocketService.subscribe(this);
    }

    ngOnInit()
    {
    }

    onNewData(data: any)
    {
        console.log(data);
        this.dataLoaded = true;
        this.onUpdate(data);
    }

}
