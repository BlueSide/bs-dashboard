import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardComponent } from './DashboardComponent';
import { Chart } from 'chart.js';
import { BSChart } from './BSChart';

@Component({ 
    selector: 'chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class ChartComponent extends DashboardComponent implements OnInit
{
    //TODO: Can we make this a constant or final somehow?
    //TODO: How do we expose this to the designer?
    readonly query = "https://bluesidenl.sharepoint.com/sites/dev/dashboard/_api/web/lists('3f891819-5635-47ff-81c1-992754c7859d')/items?$select=Title,Integer";

    public chartLoaded: boolean;

    protected chartObject: BSChart;

    private chart: any;
    private ctx: any;

    
    @ViewChild('canvas') canvas: ElementRef;

    constructor()
    {
        super();
        this.chartLoaded = false;
        this.dataQuery = this.query;
    }

    ngOnInit()
    {
        this.ctx = this.canvas.nativeElement.getContext('2d');

        let crl_color = 'rgba(255,99,132, 1)';
        let trl_color = 'rgba(54, 162, 235, 1)';
        
        this.chartObject = {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'CRL',
                    data: [],
                    backgroundColor: [crl_color, crl_color, crl_color, crl_color],
                    borderWidth: 5
                },
                           {
                    label: 'TRL',
                    data: [],
                    backgroundColor: [trl_color, trl_color, trl_color, trl_color],
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
        
        this.chart = new Chart(this.ctx, this.chartObject);
    }

    protected onUpdate(data: any)
    {
        this.chartLoaded = true;
        
        let integers: number[] = [];
        let labels: string[] = [];

        console.log("New data!", data);
        
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
