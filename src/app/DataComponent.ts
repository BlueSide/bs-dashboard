import { OnInit } from '@angular/core';
import { WebSocketService } from './WebSocketService';

export abstract class DataComponent implements OnInit
{

    protected dataSets: DataSet[];
    protected dataLoaded: boolean;
    protected hasError: boolean;

    protected abstract onUpdate(dataSet: DataSet): void;

    constructor()
    {
        this.dataSets = [];
        this.dataLoaded = false;
    }

    ngOnInit()
    {
    }

    protected addDataSet(dataSet: DataSet): void
    {
        this.dataSets.push(dataSet);
        WebSocketService.subscribe(dataSet, this);
    }

    onNewData(data: any): void
    {
        // Decide if this message is for us

        for(let dataSet of this.dataSets)
        {
            if(data.query === dataSet.query)
            {
                dataSet.data = data.results;
                this.dataLoaded = true;
                this.hasError = false;
                this.onUpdate(this.getDataSetByQuery(data.query));
            }
        }
    }
    
    onClose(): void
    {
        this.hasError = true;
        //TODO: Semantically this is incorrect, refactor.
        this.dataLoaded = true;
    }

    protected getDataSetByQuery(query: string): DataSet
    {
        for(let dataSet of this.dataSets)
        {
            if(dataSet.query === query)
            {
                return dataSet;
            }
        }
        
        return null;
    }

    protected getDataSetByName(name: string): DataSet
    {
        for(let dataSet of this.dataSets)
        {
            if(dataSet.name === name)
            {
                return dataSet;
            }
        }

        return null;
    }
    
}

export interface DataSet
{
    name?: string;
    resource: string;
    query: string;
    data?: any;
    dataComponent?: DataComponent;
}
