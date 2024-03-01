/*======== 123456789 →　1億2345万6789 ========*/
const chunk = (arr, chunkSize) => {
    const size = Math.ceil(arr.length / chunkSize);
    const chunks = [];
    for (let i = 0; i < size; i++) {
        const begin = i * chunkSize;
        const chunk = arr.slice(begin, begin + chunkSize);
        chunks.push(chunk);
    };

    return chunks;
};

const toJapNum = (num) => {
    const nums = num.toString().split('').reverse();
    const units = ['万', '億', '兆', '京'];
    return chunk(nums, 4)
        .map((chunk, i) => chunk.reverse().join('') + (i > 0 ? units[i - 1] : ''))
        .reverse()
        .join('')
};
//console.log(123456789, toJapNum(123456789));
/*================*/

/*======== 0.12345… →　12.36 ========*/
const toPercent = (num, val = false) => {
    const percent = Math.round(num * 10000) / 100;
    return val ? percent.toFixed(2) + '%' : percent.toFixed(2);
};
//console.log(0.12345, toPercent(0.12345), toPercent(0.12345, true));
/*================*/

/*======== 1,2,3,4,5 →　3 ========*/
const average = (nums) => {
    let sum = 0;
    nums.forEach(element => {
        sum += element;
    });
    return sum / nums.length;
};
//console.log([1, 2, 3, 4, 5], average([1, 2, 3, 4, 5]));
/*================*/

/*======== 1,2,3,4 →　2.5 ========*/
const median = (nums) => {
    function compareNumbers(a, b) {
        return a - b;
    };

    const half = (nums.length / 2) | 0;
    const numsAsc = nums.sort(compareNumbers);

    if (numsAsc.length % 2) {
        return numsAsc[half];
    };

    return (numsAsc[half - 1] + numsAsc[half]) / 2;
};
//console.log([1, 2, 3, 4], median([1, 2, 3, 4]));
/*================*/

/*======== 123456.78 →　123,456.78 ========*/
const decimalPart = (num, decDigits) => {
    const decPart = num - ((num >= 0) ? Math.floor(num) : Math.ceil(num));
    return decPart.toFixed(decDigits);
};

const toThousandDecimal = (num) => {
    const nums = [Math.floor(num), decimalPart(num, 2).split('.')[1]];
    return nums[0].toLocaleString() + '.' + nums[1];
};
//console.log(123456.78, toThousandDecimal(123456.78));
/*================*/
