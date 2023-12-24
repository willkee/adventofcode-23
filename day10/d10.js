const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx = parseTextFileIntoArray("./example.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

const checkValidDirs = (arr, r, c, dist, stack) => {
	// This helper function is run when we are at the start, "S" in the maze.
	// We want to check the directions that are valid to move in.
	// We want to change the value of the array to reflect the distance from "S".

	if (stack.length === 0 && dist !== 1) return;

	// const U = ["|", "7", "F"];
	// const D = ["|", "L", "J"];
	// const L = ["-", "L", "F"];
	// const R = ["-", "J", "7"];

	const lastRow = arr.length - 1;
	const lastCol = arr[r].length - 1;

	if (r > 0 && arr[r - 1][c].toString().match(/[\|7F]/)) {
		const data = { row: r - 1, col: c, dist: dist };
		stack.push(data);
		arr[r - 1][c] = dist;
	}
	if (r < lastRow && arr[r + 1][c].toString().match(/[\|LJ]/)) {
		const data = { row: r + 1, col: c, dist: dist };
		stack.push(data);
		arr[r + 1][c] = dist;
	}
	if (c > 0 && arr[r][c - 1].toString().match(/[\-LF]/)) {
		const data = { row: r, col: c - 1, dist: dist };
		stack.push(data);
		arr[r][c - 1] = dist;
	}
	if (c < lastCol && arr[r][c + 1].toString().match(/[\-J7]/)) {
		const data = { row: r, col: c + 1, dist: dist };
		stack.push(data);
		arr[r][c + 1] = dist;
	}

	dist++;
	const next = stack.shift();
	checkValidDirs(arr, next.row, next.col, next.dist + 1, stack);
};

function Day10Part1(arr) {
	for (let row = 0; row < arr.length; row++) {
		// convert array of strings into a full 2D matrix.
		const line = arr[row].split("");
		arr[row] = line;
	}

	for (let row = 0; row < arr.length; row++) {
		for (let col = 0; col < arr[row].length; col++) {
			if (arr[row][col] === "S") {
				arr[row][col] = 0;

				let dist = 1;
				const stack = [];
				checkValidDirs(arr, row, col, dist, stack);
				break;
			}
		}
	}
	console.log(arr);

	let max = 0;
	for (const row of arr) {
		for (const el of row) {
			if (el > max) max = el;
		}
	}
	return max;
}

console.log(Day10Part1(parsedArrayEx));
console.log(Day10Part1(inputArray));
