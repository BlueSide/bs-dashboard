import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponent, DataSet, DataType } from '../DataComponent';
import { BSChart, ChartObject, ChartType } from '../BSChart';
import { Chart } from 'chart.js';

@Component({ 
    selector: 'chart2',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class Chart2Component extends DataComponent implements OnInit
{

    @ViewChild('canvas') canvas: ElementRef;

    protected chart: Chart;

    asdf: boolean = false;

    
    constructor()
    {
        super();
        this.id = 3;
        
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
                }]
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
        this.chart.data.datasets[0].data = [];
        this.chart.data.datasets[2].data = [];
        this.chart.data.labels = [];
        
        for(let i in this.dataSets[0].data)
        {
            this.chart.data.datasets[0].data.push(this.dataSets[0].data[i].Integer);
            this.chart.data.datasets[2].data.push(this.dataSets[0].unfilteredData[i].Integer);
            this.chart.data.labels.push(this.dataSets[0].data[i].Title);
        }

        if(this.dataSets[1].data != undefined)
        {
            this.chart.data.datasets[1].data = [];
            for(let item of this.dataSets[1].data)
            {
                this.chart.data.datasets[1].data.push(item.Number);
            }
            
            this.chart.update();
        }
        /*
        console.log(dataSet);
        if(dataSet.name === "Test DataSet 1")
        {
            console.log("asdf");
            this.chart.labels = [];
            this.chart.data.datasets[0].data = [];
            for(let item of dataSet.data)
            {
                this.chart.labels.push(item.Title);
                this.chart.data.datasets[0].data.push(item.Iteger);
            }
        }
        
        this.chart.update();
*/
    }
}
