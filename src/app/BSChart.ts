import { ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

export class BSChart extends Chart
{
    constructor(canvas: ElementRef, chartObject: ChartObject)
    {
        let context = canvas.nativeElement.getContext('2d');
        super(context, chartObject);
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
