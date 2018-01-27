import { GlobalFilters } from './GlobalFilters';
import { Filter } from './Filter';
import { WebSocketService } from './WebSocketService';
import { Database } from './Database';

export abstract class DataComponent
{

    private readonly DATASTORE_NAME = "datasets";
    
    public dataLoaded: boolean;
    public dataSets: DataSet[] = [];

    protected hasError: boolean;
    protected localFilters: Filter[] = [];
    protected filters: Filter[] = [];
    protected id: number;

    protected abstract onUpdate(dataSet: DataSet): void;
    
    constructor()
    {
        this.dataSets = [];
        this.dataLoaded = false;

        GlobalFilters.callbacks.push(this.onFilterChange.bind(this));
    }

    protected filter(data: any[]): any[]
    {
        // Return immediately if we don't need to filter anything
        if(this.filters.length === 0)
        {
            return data;
        }

        let filteredData: any[] = [];
        
        // TODO: Implement the actual filtering
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
        Database.readDataSet(dataSet.query, this.onDatabaseRead.bind(this));
    }

    public onDatabaseRead(dataSet: DataSet)
    {
        this.dataLoaded = true;
        this.hasError = false;

        // Update the old dataset with data from the database
        let oldDataSet = this.getDataSetByQuery(dataSet.query);
        
        oldDataSet.unfilteredData = dataSet.unfilteredData;
        oldDataSet.data = this.filter(dataSet.data);
        
        // Signal the component that there's an update
        this.onUpdate(dataSet);
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
        let dataSet = this.getDataSetByQuery(newData.query);

        if(dataSet != null)
        {
            dataSet.unfilteredData = newData.results;
            this.dataLoaded = true;
            this.hasError = false;
            dataSet.data = this.filter(newData.results);
            Database.storeDataSet(dataSet.query, dataSet);
            this.onUpdate(dataSet);
        }
    }
    
    public onClose(): void
    {
        this.hasError = true;
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
    data?: any;
    unfilteredData?: any[];
    dataComponent?: DataComponent;
}


export enum DataType
{
    SHAREPOINT = "sp",
    POKEMON = "pkmn",
}
