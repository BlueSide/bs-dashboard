import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({ 
    selector: 'chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class ChartComponent implements OnInit
{
    private ctx: any;
    private chart: Chart;
    private server: any;
    
    @ViewChild('canvas') canvas: ElementRef;

    constructor(private http: HttpClient) {
    }

    ngOnInit()
    {
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
    }

    render(data: any)
    {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.chart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: ["New", "In Progress", "On Hold"],
                datasets: [{
                    label: '# of Votes',
                    data: null,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 5
                }]
            },
            options: {
                responsive: false,
                display:true
            }
        });
    }
}
