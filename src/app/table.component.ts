import { Component } from "@angular/core";
import { DataComponent, DataSet, DataType } from "./DataComponent";

@Component({
    selector: 'bs-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent extends DataComponent
{

    private urls: Map<string, string>;
    
    constructor()
    {
        super();
        this.id = 2;
        
        let dataSet1 = {
            name: "Test DataSet 1",
            type: DataType.SHAREPOINT,
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer"
        };

        let dataSet2 = {
            name: "Test DataSet 2",
            type: DataType.SHAREPOINT,
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('f995a606-71c5-40c9-809d-8d5684875adc')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('f995a606-71c5-40c9-809d-8d5684875adc')/items?$select=Title,Site_x0020_URL"
        };
        
        this.addDataSet(dataSet1);
        this.addDataSet(dataSet2);

        this.urls = new Map();
        this.urls.set("asdf", "http://www.google.com");
        this.urls.set("Test Entry", "http://www.reddit.com");
    }

    protected onUpdate(dataSet: DataSet)
    {
        // Everything is handled by the template!
    }

    public onClick(item)
    {
        if(this.urls.get(item.Title) !== undefined)
        {
            window.open(this.urls.get(item.Title));
        }
    }
   
}
