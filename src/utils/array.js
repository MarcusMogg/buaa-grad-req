export function Contain(arr, field, target) {
    return arr.reduce((accumulator, currentValue) => {
        return accumulator || currentValue[field] == target;
    }, false);
}
