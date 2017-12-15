import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponent, DataSet, DataType } from '../DataComponent';
import { BSChart, ChartObject, ChartType } from '../BSChart';
import { Chart } from 'chart.js';

@Component({ 
    selector: 'chart2',
    templateUrl: '../chart.component.html',
    styleUrls: ['../chart.component.scss']
})

export class Chart2Component extends DataComponent implements OnInit
{

    @ViewChild('canvas') canvas: ElementRef;

    protected chart: Chart;

    asdf: boolean = false;

    
    constructor()
    {
        super();

        let dataSet1: DataSet = {
            name: "Test DataSet 1",
            type: DataType.SHAREPOINT,
            resource: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')",
            query: "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer"
        };

        let dataSet2: DataSet = {
            name: "Test DataSet 2",
            type: DataType.SHAREPOINT,
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
                },
                 {
                    label: 'CRL',
                    backgroundColor: 'rgba(255,99,132, 1)',
                }
]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'point'
                },
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
        
        let titles: string[] = []
        let integers: number[] = []
        let numbers: number[] = []

        for(let item of this.dataSets[0].data)
        {
            titles.push(item.Title);
            integers.push(item.Integer);
        }

        //FIXME: onUpdate is called after dataSet[0] is filled/filtered, but then dataSet[1] is
        // not yet defined!!!
        console.log(this.dataSets[1].data);
        if(typeof this.dataSets[1].data != 'undefined')
        {
            for(let item of this.dataSets[1].data)
            {
                numbers.push(item.Number);
            }     
            this.chart.data.datasets[1].data = numbers;
        }

        this.chart.data.datasets[2].data = integers;
        this.chart.data.labels = titles;

        if(!this.asdf)
        {
            console.log("zxcv");
            this.chart.data.datasets[0].data = integers;
            this.asdf = true;
        }
        
        this.chart.update();
    }
}
