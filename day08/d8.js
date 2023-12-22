// const parseTextFileIntoArray = require("../utils/parseText");
// const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// // const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
// const inputArray = parseTextFileIntoArray("./input.txt");

const fs = require("fs");

function parseTextFile(inputPath) {
	let file;
	try {
		file = fs.readFileSync(inputPath);
	} catch (err) {
		console.error("Error has occurred in parsing the text file.");
	}

	return file.toString().trim();
}

const parsedExample1 = parseTextFile("./example1.txt");
const parsedExample2 = parseTextFile("./example2.txt");
const parsedInput = parseTextFile("./input.txt");

function processInput(arr) {
	const [dirs, input] = arr.split("\n\n");
	const _input = input.split("\n");

	const map = {};
	for (const line of _input) {
		const [key, val] = line.split(" = ");
		const _val = val.replace(/[\(\)\,]/g, "");
		const [L, R] = _val.split(" ");
		map[key] = { L, R };
	}

	return { dirs, map };
}

function D8P1(arr) {
	const { dirs, map } = processInput(arr);

	let current = "AAA";
	let pointer = 0;
	let steps = 0;

	while (current !== "ZZZ") {
		if (pointer >= dirs.length) pointer = 0;
		const currentDir = dirs[pointer];
		const currentElement = map[current];

		current = currentElement[currentDir];
		pointer++;
		steps++;
	}

	return steps;
}

console.log(D8P1(parsedExample1));
console.log(D8P1(parsedExample2));
console.log(D8P1(parsedInput));
