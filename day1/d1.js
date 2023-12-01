const parseTextFileIntoArray = require("../utils/parseText");
// const parsedArray = parseTextFileIntoArray("./example.txt");
const parsedArray = parseTextFileIntoArray("./input.txt");

const isNum = (val) => !isNaN(Number(val));

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

	let answer = 0;
	for (const num of arrayOfNums) {
		answer += num;
	}

	return answer;
}

console.log(sumOfCalibrationValues(parsedArray));
