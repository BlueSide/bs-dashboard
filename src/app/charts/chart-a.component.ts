import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponent } from '../DataComponent';
import { BSChart, ChartObject, ChartType } from '../BSChart';

@Component({ 
    selector: 'chart-a',
    templateUrl: '../chart.component.html',
    styleUrls: ['../chart.component.scss']
})

export class ChartAComponent extends DataComponent implements OnInit
{

    @ViewChild('canvas') canvas: ElementRef;

    protected chart: BSChart;
    
    constructor()
    {
        super();
    }

    ngOnInit(): void
    {
        let chartObject: ChartObject = {
            type: ChartType.BAR,
            data: {
                datasets: [{
                    label: 'CRL',
                    backgroundColor: 'rgba(255,99,132, 0.7)',
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
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

    protected onUpdate(data: any): void
    {
        let integers: number[] = [];
        let labels: string[] = [];
        
        for(var  i = 0; i < data.results.length; ++i)
        {
            integers.push(data.results[i].Integer);
            labels.push(data.results[i].Title);
        }     
        
        this.chart.chart.data.labels = labels;
        this.chart.chart.data.datasets[0].data = integers;
        this.chart.chart.update();
    }
}
