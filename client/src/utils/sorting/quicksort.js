
export function quicksort(arr, comparator = (a, b) => a - b) {
    const result = [...arr];
    quicksortHelper(result, 0, result.length - 1, comparator);
    return result;
}
function quicksortHelper(arr, low, high, comparator) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high, comparator);

        quicksortHelper(arr, low, pivotIndex - 1, comparator);
        quicksortHelper(arr, pivotIndex + 1, high, comparator);
    }
}

function partition(arr, low, high, comparator) {
    const pivotIndex = Math.floor((low + high) / 2);
    const pivot = arr[pivotIndex];

    swap(arr, pivotIndex, high);

    let i = low;

    for (let j = low; j < high; j++) {
        if (comparator(arr[j], pivot) <= 0) {
            swap(arr, i, j);
            i++;
        }
    }

    swap(arr, i, high);

    return i;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export function sortByProperty(arr, property, ascending = true) {
    const comparator = (a, b) => {
        if (ascending) {
            return a[property] - b[property];
        } else {
            return b[property] - a[property];
        }
    };

    return quicksort(arr, comparator);
}