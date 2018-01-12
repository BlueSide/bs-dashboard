//TODO: Write test functions for these!
export class Aggregate
{
    
    // STUDY: Should null and undefined values also be counted?
    public static count(input: any[]): number
    {
        return input.length;
    }

    public static sum(input: any[], field: string): number
    {
        let sum = 0;
        for(let item of input)
        {
            if(typeof item[field] !== 'number')
            {
                throw new TypeError("Can't add values that are not numbers");
            }
            sum += item[field];
        }
        return sum;
    }

    public static average(input: any[], field: string): number
    {
        // NOTE: Prevent divide by zero
        if(input.length === 0)
        {
            return 0;
        }
        
        let sum = 0;

        for(let item of input)
        {
            sum += item[field];
        }

        return sum / input.length;
    }

    public static max(input: any[], field: string): number
    {
        console.log(Aggregate.getField(input, field));
        //let test: any[] = Aggregate.getField(input, field);
        //TODO: Math.max does not take an array??
        //return Math.max(test);
        return null;
    }
    
    public static min(input: any[], field: string): number
    {
        
        return Math.min(1);
    }

    public static getField(input: any[], field: string): any[]
    {
        let arr: any[] = [];

        for(let item of input)
        {
            arr.push(item[field]);
        }
        
        return arr;
    }

}
