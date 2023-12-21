const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

const { sumArray } = require("../utils/library");
const isNum = (val) => !isNaN(Number(val));

function sumOfCalibrationValues(array) {
	const nums = [];
	for (const row of array) {
		const numsOnly = row.replace(/[^1-9]/g, "");
		const first = numsOnly[0];
		const last = numsOnly[numsOnly.length - 1];
		nums.push(Number(first.toString() + last.toString()));
	}
	return sumArray(nums);
}

function sumOfCalibrationValuesP2(array) {
	const map = {
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
	};

	const allNums = [];

	for (const row of array) {
		const rowNums = [];

		for (const num of Object.keys(map)) {
			const matches = [...row.matchAll(num)];
			if (matches.length) {
				matches.forEach((match) => {
					const numFormat = map[num];
					rowNums.push({ num: numFormat, idx: match.index });
				});
			}
		}

		for (let i = 0; i < row.length; i++) {
			const num = row[i];
			if (isNum(num)) {
				rowNums.push({ num: Number(num), idx: i });
			}
		}

		rowNums.sort((a, b) => a.idx - b.idx);
		const firstNum = rowNums[0].num;
		const lastNum = rowNums[rowNums.length - 1].num;
		const combined = Number(firstNum.toString() + lastNum.toString());
		allNums.push(combined);
	}
	console.log(allNums);
	return sumArray(allNums);
}

console.log(sumOfCalibrationValues(parsedArrayEx1));
// console.log(sumOfCalibrationValuesP2(parsedArrayEx2));
console.log(sumOfCalibrationValues(inputArray));
// console.log(sumOfCalibrationValuesP2(inputArray));
