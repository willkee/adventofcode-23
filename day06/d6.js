const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

function Day6Part1(arr) {
	for (const line of arr) {
		console.log(line);
	}
}

console.log(Day6Part1(parsedArrayEx1));
