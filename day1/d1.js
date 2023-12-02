const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

const isNum = (val) => !isNaN(Number(val));
const sumArray = (array) => array.reduce((acc, num) => acc + num, 0);

function sumOfCalibrationValues(array) {
	const arrayOfNums = [];
	for (const row of array) {
		let firstNum = null;
		let secondNum = null;
		let numCount = 0;

		for (const val of row) {
			if (isNum(val)) {
				numCount++;
				if (firstNum === null) {
					firstNum = Number(val);
				} else {
					secondNum = Number(val);
				}
			}
		}

		let combined;
		if (secondNum === null) {
			combined = Number(firstNum.toString() + firstNum.toString());
		} else {
			combined = Number(firstNum.toString() + secondNum.toString());
		}
		arrayOfNums.push(combined);
	}

	return sumArray(arrayOfNums);
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

// console.log(sumOfCalibrationValues(parsedArrayEx1));
// console.log(sumOfCalibrationValuesP2(parsedArrayEx2));
// console.log(sumOfCalibrationValues(inputArray));
console.log(sumOfCalibrationValuesP2(inputArray));
