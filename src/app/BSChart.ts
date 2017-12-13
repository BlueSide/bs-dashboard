import { ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

export class BSChart
{
    public chart: Chart;
    
    constructor(canvas: ElementRef, chartObject: ChartObject)
    {
        let context = canvas.nativeElement.getContext('2d');
        this.chart = new Chart(context, chartObject);
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
