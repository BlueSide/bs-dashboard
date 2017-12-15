import { ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

export class BSChart extends Chart
{
    public urls: string[];
    
    constructor(canvas: ElementRef, chartObject: ChartObject)
    {
        let context = canvas.nativeElement.getContext('2d');
        super(context, chartObject);
        this.urls = [];
    }
}

export interface ChartObject
{
    type: ChartType;
    data: any;
    options: any;
}

export enum ChartType
{
    BAR = 'bar',
    PIE = 'pie',
    LINE = 'line'
}
