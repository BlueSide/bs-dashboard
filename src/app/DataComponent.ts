import { GlobalFilters } from './GlobalFilters';
import { Filter } from './Filter';
import { WebSocketService } from './WebSocketService';

export abstract class DataComponent
{

    protected dataSets: DataSet[] = [];
    protected dataLoaded: boolean;
    protected hasError: boolean;
    protected localFilters: Filter[] = [];
    protected filters: Filter[] = [];
    
    protected abstract onUpdate(dataSet: DataSet): void;
    
    constructor()
    {
        this.dataSets = [];
        this.dataLoaded = false;
        GlobalFilters.callbacks.push(this.onFilterChange.bind(this));
    }

    protected filter(data: any[]): any[]
    {
        //Return immediately if we don't need to filter anything
        if(this.filters.length === 0)
        {
            return data;
        }

        let filteredData: any[] = [];
        
        //TODO: Implement the actual filtering
        for(let filter of this.filters)
        {
            for(let item of data)
            {
                if(filter.filter(item))
                {
                    filteredData.push(item);
                }
            }
        }

        return filteredData;
    }

    protected addDataSet(dataSet: DataSet): void
    {
        this.dataSets.push(dataSet);
        WebSocketService.subscribe(dataSet, this);
    }

    private onFilterChange(): void
    {
        this.filters = [];
        this.filters = GlobalFilters.getFilters().concat(this.localFilters);

        for(let dataSet of this.dataSets)
        {
            dataSet.data = this.filter(dataSet.unfilteredData);
            this.onUpdate(dataSet);
        }
    }

    public onNewData(newData: any): void
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
    
    public onClose(): void
    {
        this.hasError = true;
        //TODO: Semantically this is incorrect, refactor.
        //this.dataLoaded = true;
    }

    protected addFilter(filter: Filter): void
    {
        this.localFilters.push(filter);
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
    data?: any[];
    unfilteredData?: any[];
    dataComponent?: DataComponent;
}


export enum DataType
{
    SHAREPOINT = "sp",
}
