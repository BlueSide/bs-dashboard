import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponent, DataSet } from '../DataComponent';
import { BSChart, ChartObject, ChartType } from '../BSChart';

@Component({ 
    selector: 'chart1',
    templateUrl: '../chart.component.html',
    styleUrls: ['../chart.component.scss']
})

export class Chart1Component extends DataComponent implements OnInit
{

    @ViewChild('canvas') canvas: ElementRef;

    protected chart: BSChart;

    constructor()
    {
        super();

        let dataSet: DataSet = {
            name: "Test DataSet 1",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer"
        };
        
        this.addDataSet(dataSet);
    }

    ngOnInit(): void
    {
        let chartObject: ChartObject = {
            type: ChartType.PIE,
            data: {
                datasets: [{
                    label: 'CRL',
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
                cutoutPercentage: 75;
                responsive: true,
                legend: {
                    position: 'right'
                }
            }
        };
        
        this.chart = new BSChart(this.canvas, chartObject);
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
        
        this.chart.chart.data.labels = labels;
        this.chart.chart.data.datasets[0].data = integers;
        this.chart.chart.update();
    }
}
