import { ViewChild, ElementRef, OnInit } from '@angular/core';
import { BSChart } from './BSChart';

export abstract class DashboardComponent implements OnInit
{
    @ViewChild('canvas') canvas: ElementRef;
    protected context : any;    
    protected chartObject: BSChart;

    constructor()
    {
    }

    ngOnInit()
    {
        this.context = this.canvas.nativeElement.getContext('2d');
    }
}
