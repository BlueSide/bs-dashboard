import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartType } from './ChartType';
import { BSChart } from './BSChart';

@Component({ 
    selector: 'chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class ChartComponent implements OnInit
{
    private ctx: any;
    private chart: BSChart;
    private server: any;
    
    @ViewChild('canvas') canvas: ElementRef;

    constructor(private http: HttpClient) { }

    ngOnInit()
    {
        let options = {
            responsive: false,
            display:true
        };

        let data = [1,2,3];

        let labels = ['New', 'In Progress', 'On Hold'];
        let label = '# of Votes';
        let ctx = this.canvas.nativeElement.getContext('2d');
        this.chart = new BSChart(ChartType.PIE, data, options, labels, label, ctx);

        /*
        var socket = new WebSocket("ws://localhost:8080/d/asdf");
        console.log(socket);
        // Connection opened
        socket.addEventListener('open', function (event) {
            console.log(event);
            socket.send('Hello from Dashboard!');
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
*/
        
    }

    render(data: any)
    {
        
    }
}
