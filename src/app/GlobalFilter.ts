import { Operator } from './Operator';
import { Filter } from './Filter';

export class GlobalFilter
{
    public name: string;
    public filter: Filter;
    public operator: Operator;
    public selected: boolean;

    constructor(name: string, filter: string, operator: Operator)
    {
        this.name = name;
        this.filter = new Filter(filter);
        this.operator = operator;
    }
}
