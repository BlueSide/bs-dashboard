import { Component } from "@angular/core";
import { DataComponent, DataSet } from "./DataComponent";

@Component({
    selector: 'bs-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent extends DataComponent
{
    public values: string[] = []; 
    
    constructor()
    {
        super();
        
        let dataSet = new DataSet();
        dataSet.resource = "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')";
        dataSet.query= "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer";
        
        this.addDataSet(dataSet);
    }

    protected onUpdate(dataSet: any)
    {
        for(let result of dataSet.results)
        {
            this.values.push(result);
        }
    }
   
}
