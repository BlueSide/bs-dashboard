import { Component } from '@angular/core';
import { GlobalFilter } from './GlobalFilter';
import { Operator } from './Operator';

@Component({ 
    selector: 'global-filters',
    templateUrl: 'global-filters.component.html',
    styleUrls: ['global-filters.component.scss']
})

export class GlobalFilters
{
    public static callbacks: Function[] = [];

    public filters: GlobalFilter[] = [];
    
    constructor()
    {
        this.filters.push(new GlobalFilter("Test"));
    }

    toggle(index)
    {
        this.filters[index].selected = !this.filters[index].selected;

        for(let callback of GlobalFilters.callbacks)
        {
            callback(this.filters[index].selected);
        }
    }
    
}
