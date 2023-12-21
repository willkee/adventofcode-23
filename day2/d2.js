const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

/**

Determine which games would have been possible if the bag had been loaded with only

12 red cubes
13 green cubes
14 blue cubes

What is the sum of the IDs of those games?

**/

// PART 1

function Part1(arr) {
	const keyMap = {};

	const max = {
		red: 12,
		green: 13,
		blue: 14,
	};

	let idTotal = 0;

	for (const line of arr) {
		const [game, data] = line.split(": ");
		const gameNum = game.split(" ")[1];
		const dataMap = data.split("; ");
		keyMap[gameNum] = { blue: 0, red: 0, green: 0 };

		for (const round of dataMap) {
			const group = round.split(", ");

			for (const color of group) {
				const [count, name] = color.split(" ");
				const numCount = Number(count);

				if (keyMap[gameNum][name] && keyMap[gameNum][name] < numCount) {
					keyMap[gameNum][name] = numCount;
				} else if (!keyMap[gameNum][name]) {
					keyMap[gameNum][name] = numCount;
				}
			}
		}
	}

	for (const [id, data] of Object.entries(keyMap)) {
		const { blue, red, green } = data;

		if (blue <= max.blue && red <= max.red && green <= max.green) {
			idTotal += Number(id);
		}
	}

	return idTotal;
}

console.log(Part1(parsedArrayEx1));
console.log(Part1(inputArray));
