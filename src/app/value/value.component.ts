import { Component, OnInit } from '@angular/core';

import { DataComponent, DataSet, DataType } from '../DataComponent';
import { Filter } from '../Filter';
import { Aggregate } from '../Aggregate';

@Component({ 
    selector: 'value',
    templateUrl: './value.component.html',
    styleUrls: ['./value.component.scss']
})

export class ValueComponent extends DataComponent implements OnInit
{

    public value: number;

    constructor()
    {
        super();

        let dataSet: DataSet = {
            name: "Test DataSet 1",
            type: DataType.SHAREPOINT,
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer"
        };
        
        this.addDataSet(dataSet);
    }

    public ngOnInit(): void
    {
        
    }

    protected onUpdate(dataSet: DataSet): void
    {
        this.value = Aggregate.max(dataSet.data, "Integer");
    }
}

