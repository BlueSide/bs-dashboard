import { TestBed, async } from '@angular/core/testing';
import { Aggregate } from './Aggregate';
describe('Aggregate', () => {

    /**
     * Count
     */
    it('counts an array in Count', async(() => {
        const actual = Aggregate.count([1,2,3,4]);
        expect(actual).toBe(4);
    }));

    it('allows mixed types in Count', async(() => {
        const actual = Aggregate.count([{test: "6"}, 2 ,"string", [1,2,3,4]]);
        expect(actual).toBe(4);
    }));

    
    it('should also count null values in Count', async(() => {
        const nullValue = Aggregate.count([1,2,null,4]);
        const undefinedValue = Aggregate.count([1,2,undefined,4]);
        expect(nullValue).toBe(4);
        expect(undefinedValue).toBe(4);
    }));

    it('should return zero on empty array in Count', async(() => {
        const actual = Aggregate.count([]);
        expect(actual).toBe(0);
    }));

    it('should throw TypeError on null value in Count', async(() => {
        expect(function(){ Aggregate.count(null); }).toThrow(new TypeError("Cannot read property 'length' of null"));
    }));

    /**
     * Sum
     */
    it('returns the sum of a list of items in Sum', async(() => {
        let items = [{"test": 1}, {"test": 2}, {"test": 3}, {"test": 4}];
        const actual = Aggregate.sum(items, "test");
        expect(actual).toBe(10);
    }));

    it('refuses mixed types in Sum', async(() => {
        let items = [{"test": 1}, {"test": undefined}, {"test": 3}, {"test": 4}];
        expect(function () {
            Aggregate.sum(items, "test");
        }).toThrow(new TypeError("Can't add values that are not numbers"));

        items = [{"test": 1}, {"test": null}, {"test": 3}, {"test": 4}];
        expect(function () {
            Aggregate.sum(items, "test");
        }).toThrow(new TypeError("Can't add values that are not numbers"));

        items = [{"test": 1}, {"test": "string"}, {"test": 3}, {"test": 4}];
        expect(function () {
            Aggregate.sum(items, "test");
        }).toThrow(new TypeError("Can't add values that are not numbers"));
    }));

    it('should return zero on empty array in Sum', async(() => {
        const actual = Aggregate.sum([], "test");
        expect(actual).toBe(0);
    }));

    /**
     * Average
     */
    it('should return the average of an item list in average', async(() => {
        let items = [{"test": 1}, {"test": 2}, {"test": 3}, {"test": 4}];
        const actual = Aggregate.sum(items, "test");
        expect(actual).toBe(10);
    }));
    

});
