import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponent, DataSet } from '../DataComponent';
import { BSChart, ChartObject, ChartType } from '../BSChart';

@Component({ 
    selector: 'chart2',
    templateUrl: '../chart.component.html',
    styleUrls: ['../chart.component.scss']
})

export class Chart2Component extends DataComponent implements OnInit
{

    @ViewChild('canvas') canvas: ElementRef;

    protected chart: BSChart;
    
    constructor()
    {
        super();

        let dataSet1: DataSet = {
            name: "Test DataSet 1",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer"
        };

        let dataSet2: DataSet = {
            name: "Test DataSet 1",
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Number",
        };
        
        this.addDataSet(dataSet1);
        this.addDataSet(dataSet2);
    }

    ngOnInit(): void
    {
        let chartObject: ChartObject = {
            type: ChartType.BAR,
            data: {
                datasets:
                [{
                    label: 'CRL',
                    backgroundColor: 'rgba(255,99,132, 0.7)',
                },
                 {
                    type: ChartType.LINE,
                    label: 'CRL',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'point'
                }
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        };
        
        this.chart = new BSChart(this.canvas, chartObject);
    }

    protected onUpdate(dataSet: DataSet): void
    {
        let integers: number[] = [];
        let labels: string[] = [];
        
        for(let item of this.dataSets[0].data)
        {
            integers.push(item.Integer);
            labels.push(item.Title);
        }     

        let numbers: number[] = [];

        for(let item of this.dataSets[1].data)
        {
            numbers.push(item.Number);
        }     

        this.chart.chart.data.labels = labels;
        this.chart.chart.data.datasets[0].data = integers;
        this.chart.chart.data.datasets[1].data = numbers;
        this.chart.chart.update();
    }
}
