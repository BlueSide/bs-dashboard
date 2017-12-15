import { GlobalFilters } from './global-filters.component';
import { WebSocketService } from './WebSocketService';

export abstract class DataComponent
{

    protected dataSets: DataSet[];
    protected dataLoaded: boolean;
    protected hasError: boolean;

    private test: boolean;

    protected abstract onUpdate(dataSet: DataSet): void;
    
    constructor()
    {
        this.dataSets = [];
        this.dataLoaded = false;
        GlobalFilters.callbacks.push(this.onFilterChange.bind(this));
    }

    protected addDataSet(dataSet: DataSet): void
    {
        this.dataSets.push(dataSet);
        WebSocketService.subscribe(dataSet, this);
    }

    private onFilterChange(test: boolean): void
    {
        this.test = test;
        for(let dataSet of this.dataSets)
        {
            console.log(dataSet.unfilteredData);
            dataSet.data = this.filter(dataSet.unfilteredData);
            this.onUpdate(dataSet);
        }
    }

    clone(obj)
    {
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = new obj.constructor(); 
        for(var key in obj)
            temp[key] = this.clone(obj[key]);

        return temp;
    }
    
    protected filter(data: any[]): any[]
    {
        let filteredData = this.clone(data);

        if(this.test)
        {
            for(let i = 0; i < filteredData.length; ++i)
            {
                filteredData[i].Integer -= 20;
            }
        }
        else
        {
            filteredData = this.clone(data);
        }
        
        return filteredData;
    }

    onNewData(newData: any): void
    {
        // Decide if this message is for us
        for(let dataSet of this.dataSets)
        {
            if(newData.query === dataSet.query)
            {
                dataSet.unfilteredData = newData.results;
                this.dataLoaded = true;
                this.hasError = false;
                dataSet.data = this.filter(newData.results);
                this.onUpdate(dataSet);
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
    type: DataType;
    resource: string;
    query: string;
    data?: any;
    unfilteredData?: any;
    dataComponent?: DataComponent;
}


export enum DataType
{
    SHAREPOINT = "sp",
}
