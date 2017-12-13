import { OnInit } from '@angular/core';
import { WebSocketService } from './WebSocketService';

export abstract class DataComponent implements OnInit
{

    //protected dataSets: DataSet[];
    protected dataLoaded: boolean;
    protected hasError: boolean;

    protected abstract onUpdate(data: any): void;

    constructor()
    {
        this.dataLoaded = false;
    }

    ngOnInit()
    {
    }

    protected addDataSet(dataSet: DataSet): void
    {
        //this.dataSets.push(dataSet);
        WebSocketService.subscribe(dataSet, this);
    }

    onNewData(data: any): void
    {
        this.dataLoaded = true;
        this.hasError = false;
        this.onUpdate(data);
    }

    onClose(): void
    {
        this.hasError = true;
        //TODO: Semantically this is incorrect, refactor.
        this.dataLoaded = true;
    }
    
}

export class DataSet
{
    resource: string;
    query: string;
    data: any;
    dataComponent: DataComponent;
    
    constructor()
    {
    }

    public equals(dataSet: DataSet): boolean
    {
        return (dataSet.query === this.query);
    }
}
