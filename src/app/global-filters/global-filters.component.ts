import { Component } from '@angular/core';
import { GlobalFilter } from '../Filter';
import { GlobalFilters } from '../GlobalFilters';
@Component({ 
    selector: 'global-filters',
    templateUrl: 'global-filters.component.html',
    styleUrls: ['global-filters.component.scss']
})

export class GlobalFiltersComponent extends GlobalFilters
{
    public filters: GlobalFilter[] = GlobalFilters.filters;

    constructor()
    {
        super();
    }

    toggle(index)
    {
        GlobalFilters.filters[index].selected = !GlobalFilters.filters[index].selected;

        for(let callback of GlobalFilters.callbacks)
        {
            callback(GlobalFilters);
        }
    }
    
}
