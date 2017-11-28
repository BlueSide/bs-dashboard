export class Filter
{
    private filter: any;
    
    constructor(filter: string)
    {
        this.filter = this.stringToFilterObject(filter);
    }

    stringToFilterObject(input: string): any
    {
        console.log(input);
        return {};
    }
}
