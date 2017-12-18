export class Filter
{
    public filter: any;
    
    constructor(filter: any)
    {
        this.filter = filter;
    }
}

export class GlobalFilter extends Filter
{
    public selected: boolean = false;
    public name: string;

    constructor(name: string, filter: any)
    {
        super(filter);
        this. name = name;
    }
}
