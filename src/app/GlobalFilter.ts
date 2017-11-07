import { Operator } from './Operator';

export class GlobalFilter
{
    public name: string;
    public filter: string;
    public operator: Operator;
    public selected: boolean;

    constructor(name: string, filter: string, operator: Operator)
    {
        this.name = name;
        this.filter = filter;
        this.operator = operator;
        console.log(this.name);
    }
}
