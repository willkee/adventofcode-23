const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

function Day6Part1(arr) {
	const times = arr[0].split(/\D/).filter((el) => el !== "");
	const dist = arr[1].split(/\D/).filter((el) => el !== "");
	for (let i = 0; i < times.length; i++) times[i] = Number(times[i]);
	for (let i = 0; i < dist.length; i++) dist[i] = Number(dist[i]);

	const winNums = [];

	for (let i = 0; i < times.length; i++) {
		// Each iteration of this outer loop is a separate game.
		const record = dist[i];
		const totalTime = times[i];
		let winCount = 0;
		// we're skipping t of 0 and total time because winning is impossible.
		for (let t = 1; t < totalTime; t++) {
			// For each game we're checking each time t to see the distance
			const moveTime = totalTime - t;
			const distance = moveTime * t;

			if (distance > record) winCount++;
		}
		winNums.push(winCount);
	}

	let product = 1;
	for (const num of winNums) product *= num;

	return product;
}

function Day6Part2(arr) {
	const time = Number(arr[0].replace(/\D/g, ""));
	const record = Number(arr[1].replace(/\D/g, ""));

	let winCount = 0;
	// we're skipping t of 0 and total time because winning is impossible.
	for (let t = 1; t < time; t++) {
		// For each game we're checking each time t to see the distance
		const moveTime = time - t;
		const distance = moveTime * t;
		if (distance > record) winCount++;
	}
	return winCount;
}

// console.log(Day6Part1(parsedArrayEx1));
// console.log(Day6Part1(inputArray));
console.log(Day6Part2(parsedArrayEx1));
console.log(Day6Part2(inputArray));
