import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponent } from './DataComponent';
import { Chart } from 'chart.js';
import { BSChart } from './BSChart';

@Component({ 
    selector: 'chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class ChartComponent extends DataComponent implements OnInit
{

    protected chart: Chart;
    
    constructor() { super(); }

    ngOnInit(): void
    {
        this.chartObject = {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'CRL',
                    data: [],
                    backgroundColor: 'rgba(255,99,132, 1)',
                },
                           {
                    label: 'TRL',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                }]
            },
            options: {
                responsive: true,
                display:true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        }
        console.log(this.context);
        this.chart = new Chart(this.context, this.chartObject);
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
        
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = integers;
        this.chart.data.datasets[1].data = [].concat(integers).reverse();
        this.chart.update();
    }
}
