// const parseTextFileIntoArray = require("../utils/parseText");
// const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// // const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
// const inputArray = parseTextFileIntoArray("./input.txt");

const fs = require("fs");
const { GCD } = require("../utils/library");

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
const parsedExample3 = parseTextFile("./example3.txt");
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

function D8P2(arr) {
	const { dirs, map } = processInput(arr);

	const current = Object.keys(map).filter((key) => key.endsWith("A"));

	// let done = false;
	// while (!done) {
	// 	done = true;

	// 	if (pointer >= dirs.length) pointer = 0;
	// 	const currentDir = dirs[pointer];

	// 	for (let i = 0; i < current.length; i++) {
	// 		const nextDirs = map[current[i]];
	// 		const nextEl = nextDirs[currentDir];
	// 		current[i] = nextEl;
	// 	}

	// 	steps++;
	// 	pointer++;

	// 	for (const el of current) {
	// 		if (el[el.length - 1] !== "Z") {
	// 			done = false;
	// 			break;
	// 		}
	// 	}
	// }

	// Worked on test case but timed out on main input.

	const nums = [];

	for (let i = 0; i < current.length; i++) {
		let pointer = 0;
		let steps = 0;

		let node = current[i];
		while (!node.endsWith("Z")) {
			if (pointer >= dirs.length) pointer = 0;

			const nextDir = dirs[pointer];
			const nextNode = map[node][nextDir];
			node = nextNode;

			steps++;
			pointer++;
		}
		nums.push(steps);
	}

	const LCM = (a, b) => (a * b) / GCD(a, b);
	return nums.reduce((acc, cur) => LCM(acc, cur), 1);
}

// console.log(D8P1(parsedExample1));
// console.log(D8P1(parsedExample2));
// console.log(D8P1(parsedInput));
console.log(D8P2(parsedExample3));
console.log(D8P2(parsedInput));
