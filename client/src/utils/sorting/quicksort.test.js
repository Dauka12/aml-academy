import { describe, expect, test } from 'vitest';
import { quicksort, sortByProperty } from './quicksort';

describe('Quicksort Algorithm', () => {
    test('should handle empty arrays', () => {
        const emptyArray = [];
        const result = quicksort(emptyArray);
        expect(result).toEqual([]);
    });

    test('should handle single element arrays', () => {
        const singleElementArray = [42];
        const result = quicksort(singleElementArray);
        expect(result).toEqual([42]);
    });

    test('should handle already sorted arrays', () => {
        const sortedArray = [1, 2, 3, 4, 5];
        const result = quicksort(sortedArray);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort reverse ordered arrays', () => {
        const reverseSortedArray = [5, 4, 3, 2, 1];
        const result = quicksort(reverseSortedArray);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort random arrays', () => {
        const randomArray = [3, 1, 4, 1, 5, 9, 2, 6, 5];
        const result = quicksort(randomArray);
        expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    test('should handle arrays with duplicate elements', () => {
        const arrayWithDuplicates = [4, 2, 4, 1, 3, 2];
        const result = quicksort(arrayWithDuplicates);
        expect(result).toEqual([1, 2, 2, 3, 4, 4]);
    });

    test('should sort arrays with negative numbers', () => {
        const arrayWithNegatives = [-3, 5, 0, -8, 4, -1];
        const result = quicksort(arrayWithNegatives);
        expect(result).toEqual([-8, -3, -1, 0, 4, 5]);
    });

    test('should handle large arrays', () => {
        const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
        const result = quicksort(largeArray);
        const manualSort = [...largeArray].sort((a, b) => a - b);
        expect(result).toEqual(manualSort);
    });

    test('should work with custom comparator functions', () => {
        const numbers = [5, 2, 8, 1, 9];
        const result = quicksort(numbers, (a, b) => b - a);
        expect(result).toEqual([9, 8, 5, 2, 1]);
    });

    test('should not modify the original array', () => {
        const original = [3, 1, 4, 2];
        const originalCopy = [...original];
        quicksort(original);
        expect(original).toEqual(originalCopy);
    });

    describe('sortByProperty function', () => {
        const people = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Carol', age: 35 },
            { name: 'Dave', age: 20 }
        ];

        test('should sort objects by property in ascending order', () => {
            const sortedByAge = sortByProperty(people, 'age');
            expect(sortedByAge.map(p => p.age)).toEqual([20, 25, 30, 35]);
        });

        test('should sort objects by property in descending order', () => {
            const sortedByAgeDesc = sortByProperty(people, 'age', false);
            expect(sortedByAgeDesc.map(p => p.age)).toEqual([35, 30, 25, 20]);
        });
    });
});