import { Component, OnInit } from '@angular/core';
import { DataComponent, DataSet, DataType } from '../DataComponent';

@Component({
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent extends DataComponent implements OnInit {

    constructor()
    {
        super();
        
        // Bas: DATA SHIT GOES HERE!
    }

    // Thomas: JS SHIT GOES HERE!
    ngOnInit()
    {
        
    }

    // Cikzh: CUSTOM FILTER SHIT GOES HERE!
    protected onUpdate(dataSet: DataSet): void
    {
        
    }
}
