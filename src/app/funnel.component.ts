import { Component, OnInit } from '@angular/core';

import { DataComponent, DataSet, DataType } from './DataComponent';
import { Filter } from './Filter';
import { Aggregate } from './Aggregate';

@Component({ 
    selector: 'funnel',
    templateUrl: './funnel.component.html',
    styleUrls: ['./funnel.component.scss']
})

export class FunnelComponent extends DataComponent implements OnInit
{

    public columns = ["Intake", "Support", "Execution", "Market push", "asdf"]
    public rows = ["Health", "Tech", "Mining", "Forestry", "asdf"]
    public data = [
        [1,  2,  3,  4, 33],
        [5,  6,  7,  8, 33],
        [9,  10, 11, 12, 33],
        [13, 14, 15, 16, 33],
        [13, 14, 15, 16, 33],
    ];    
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
        console.log(dataSet.data);
    }
}
