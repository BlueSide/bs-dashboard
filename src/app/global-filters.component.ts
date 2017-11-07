import { Component } from '@angular/core';
import { GlobalFilter } from './GlobalFilter';
import { Operator } from './Operator';

@Component({ 
    selector: 'global-filters',
    templateUrl: 'global-filters.component.html',
    styleUrls: ['global-filters.component.scss']
})

export class GlobalFiltersComponent
{
    public filters: GlobalFilter[] = [];

    constructor()
    {
        this.filters.push(new GlobalFilter("First filter", "", Operator.AND));
        this.filters.push(new GlobalFilter("Second filter", "", Operator.AND));
        this.filters.push(new GlobalFilter("Third filter", "", Operator.AND));
        this.filters.push(new GlobalFilter("Fourth filter", "", Operator.AND));
        
    }

    toggle(index)
    {
        this.filters[index].selected = !this.filters[index].selected;
    }
    
}
