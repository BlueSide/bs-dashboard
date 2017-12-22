import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartElement } from 'chart.js';

import { DataComponent, DataSet, DataType } from '../DataComponent';
import { BSChart, ChartObject, ChartType } from '../BSChart';
import { Filter } from '../Filter';

@Component({ 
    selector: 'chart1',
    templateUrl: '../chart.component.html',
    styleUrls: ['../chart.component.scss']
})

//TODO: Make Chart Component and encapsulate the Chart objects etc.
export class Chart1Component extends DataComponent implements OnInit
{

    @ViewChild('canvas') canvas: ElementRef;

    protected chart: Chart;

    constructor()
    {
        super();
        this.id = 1;

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
        let chartObject: ChartObject = {
            type: ChartType.PIE,
            data: {
                datasets: [{
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                }]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                legend: {
                    position: 'right'
                }
            }
        };

        this.chart = new BSChart(this.canvas, chartObject);
        this.chart.options.onClick = this.onClick.bind(this);

        //TODO: Dynamic SP views?
        //NOTE: Urls are always mapped to labels in this implementation
        this.chart.addUrl("Test Entry", "http://www.blueside.nl/");
        this.chart.addUrl("asdf", "https://bluesidenl.sharepoint.com/");
    }

    protected onUpdate(dataSet: DataSet): void
    {
        let integers: number[] = [];
        let labels: string[] = [];
        
        for(let item of dataSet.data)
        {
            integers.push(item.Integer);
            labels.push(item.Title);
        }     
        
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = integers;
        this.chart.update();
    }

    public onClick(event)
    {
        let elements: ChartElement = this.chart.getElementsAtEvent(event);

        if(elements.length > 0 && this.chart.urls.get(elements[0]._model.label) !== undefined)
        {
            //TODO: Support mixed charts?
            window.open(this.chart.urls.get(elements[0]._model.label));
        }
    }
}

