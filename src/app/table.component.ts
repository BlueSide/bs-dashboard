import { Component } from "@angular/core";
import { DataComponent, DataSet } from "./DataComponent";

@Component({
    selector: 'bs-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent extends DataComponent
{
    public dataSet1: DataSet;
    public dataSet2: DataSet;

    constructor()
    {
        super();
        
        this.dataSet1 = {
            name: "Test DataSet 1",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer"
        };

        this.dataSet2 = {
            name: "Test DataSet 2",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('f995a606-71c5-40c9-809d-8d5684875adc')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('f995a606-71c5-40c9-809d-8d5684875adc')/items?$select=Title,Site_x0020_URL"
        };
        
        this.addDataSet(this.dataSet1);
        this.addDataSet(this.dataSet2);
    }

    protected onUpdate(dataSet: DataSet)
    {
        this.dataSet1 = this.getDataSetByName("Test DataSet 1");
        this.dataSet2 = this.getDataSetByName("Test DataSet 2");
    }
   
}
