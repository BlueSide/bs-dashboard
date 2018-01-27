import { Component, OnInit } from '@angular/core';

import { DataComponent, DataSet, DataType } from '../DataComponent';
import { Filter } from '../Filter';
import { Aggregate } from '../Aggregate';

@Component({ 
    selector: 'funnel',
    templateUrl: './funnel.component.html',
    styleUrls: ['./funnel.component.scss']
})

export class FunnelComponent extends DataComponent implements OnInit
{

    public columns = ["Intake", "Support", "Execution", "Market push"];
    public rows = ["Health", "Tech", "Mining", "Forestry", "asdff"];
    public data = [
        [1,  2,  3,  4, 33, 34],
        [5,  6,  7,  8, 33, 35],
        [9,  10, 11, 12, 33, 36],
        [13, 14, 15, 16, 33, 37],
        [13, 14, 15, 16, 33, 38],
    ];

    constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        
    }

    protected onUpdate(dataSet: DataSet): void
    {
    }
}
