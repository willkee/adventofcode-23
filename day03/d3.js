const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

const isSymbol = (el) => /[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/.test(el);
const isNum = (el) => /[0-9]/.test(el);
const { sumArray } = require("../utils/library");

const getPartNum = (matrix, [row, col]) => {
	// Strings cannot be mutated. Must be converted to array, mutated, then converted back to string.
	const lineArr = matrix[row].split("");
	let num = "";
	let marker = col;

	while (isNum(lineArr[marker]) && isNum(lineArr[marker - 1])) {
		// Traverse backward to find beginning of the number
		marker--;
	}
	while (isNum(lineArr[marker])) {
		// Traverse forward through the number
		num += lineArr[marker];
		lineArr[marker] = "X";
		marker++;
	}

	matrix[row] = lineArr.join("");
	return Number(num);
};

const adjNumCoords = (matrix, [row, col]) => {
	const rowLength = matrix.length;
	const colLength = matrix[0].length;

	const coords = [];

	let up, down, left, right, upLeft, upRight, downLeft, downRight;

	if (row > 0) {
		up = matrix[row - 1][col];

		if (col > 0) {
			upLeft = matrix[row - 1][col - 1];
		}
		if (col < colLength - 1) {
			upRight = matrix[row - 1][col + 1];
		}
	}
	if (row < rowLength - 1) {
		down = matrix[row + 1][col];

		if (col > 0) {
			downLeft = matrix[row + 1][col - 1];
		}
		if (col < colLength - 1) {
			downRight = matrix[row + 1][col + 1];
		}
	}
	if (col > 0) {
		left = matrix[row][col - 1];
	}
	if (col < colLength - 1) {
		right = matrix[row][col + 1];
	}

	if (up && isNum(up)) coords.push([row - 1, col]);
	if (down && isNum(down)) coords.push([row + 1, col]);
	if (left && isNum(left)) coords.push([row, col - 1]);
	if (right && isNum(right)) coords.push([row, col + 1]);
	if (upLeft && isNum(upLeft)) coords.push([row - 1, col - 1]);
	if (upRight && isNum(upRight)) coords.push([row - 1, col + 1]);
	if (downLeft && isNum(downLeft)) coords.push([row + 1, col - 1]);
	if (downRight && isNum(downRight)) coords.push([row + 1, col + 1]);

	return coords;
};

const Part1 = (matrix) => {
	const arrayOfNums = [];

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			const el = matrix[row][col];
			if (isSymbol(el)) {
				// Symbol found; look in all directions for numbers
				// If found, add to array
				const coords = adjNumCoords(matrix, [row, col]);

				for (const [row, col] of coords) {
					const num = getPartNum(matrix, [row, col]);
					arrayOfNums.push(num);
				}
			}
		}
	}

	// sum up the numbers
	return sumArray(arrayOfNums);
};

const Part2 = (matrix) => {
	const arrayOfNums = [];

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			const el = matrix[row][col];
			if (el === "*") {
				// Gear found; look in all directions for numbers
				// If found, add to array
				const gearRatio = [];
				const coords = adjNumCoords(matrix, [row, col]);
				for (const [row, col] of coords) {
					const num = getPartNum(matrix, [row, col]);
					if (num > 0) gearRatio.push(num);
				}

				if (gearRatio.length === 2) {
					arrayOfNums.push(gearRatio[0] * gearRatio[1]);
				}
			}
		}
	}

	// sum up the numbers
	return sumArray(arrayOfNums);
};

// console.log(Part1(parsedArrayEx1));
// console.log(Part1(inputArray));
console.log(Part2(parsedArrayEx1));
console.log(Part2(inputArray));
