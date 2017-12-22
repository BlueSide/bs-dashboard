import { GlobalFilter, Filter } from './Filter';

export class GlobalFilters
{
    public static filters: GlobalFilter[] = [];
    public static callbacks: Function[] = [];

    constructor()
    {
        let filter = new GlobalFilter(
            "Integer > 30",
            function (item): boolean
            {
                if(item.Integer != undefined)
                {
                    return item.Integer > 35;    
                }
                return true;
            }
        );

        GlobalFilters.addFilter(filter);
    }

    public static getFilters(): Filter[]
    {
        let filters: Filter[] = [];

        for(let filter of GlobalFilters.filters)
        {
            if(filter.selected)
            {
                filters.push(filter);
            }
        }

        return filters;
    }

    public static addFilter(filter: GlobalFilter): void
    {
        GlobalFilters.filters.push(filter);        
    }
        
}
