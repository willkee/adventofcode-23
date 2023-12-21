// const parseTextFileIntoArray = require("../utils/parseText");
// const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
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

const parsedExample = parseTextFile("./example1.txt");
const parsedInput = parseTextFile("./input.txt");

const convertToNum = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			arr[i][j] = Number(arr[i][j]);
		}
	}

	// sort by source value (desc)
	arr.sort((a, b) => b[1] - a[1]);
	return arr;
};

function P1(arr) {
	const input = arr.split("\n\n");
	const seeds = input[0].split(": ")[1].split(" ");
	const seedToSoil = input[1].split(":\n")[1].split("\n");
	const soilToFert = input[2].split(":\n")[1].split("\n");
	const fertToWater = input[3].split(":\n")[1].split("\n");
	const waterToLight = input[4].split(":\n")[1].split("\n");
	const lightToTemp = input[5].split(":\n")[1].split("\n");
	const tempToHum = input[6].split(":\n")[1].split("\n");
	const humToLoc = input[7].split(":\n")[1].split("\n");

	for (const i in seedToSoil) seedToSoil[i] = seedToSoil[i].split(" ");
	for (const i in soilToFert) soilToFert[i] = soilToFert[i].split(" ");
	for (const i in fertToWater) fertToWater[i] = fertToWater[i].split(" ");
	for (const i in waterToLight) waterToLight[i] = waterToLight[i].split(" ");
	for (const i in lightToTemp) lightToTemp[i] = lightToTemp[i].split(" ");
	for (const i in tempToHum) tempToHum[i] = tempToHum[i].split(" ");
	for (const i in humToLoc) humToLoc[i] = humToLoc[i].split(" ");

	for (let i = 0; i < seeds.length; i++) seeds[i] = Number(seeds[i]);

	convertToNum(seedToSoil);
	convertToNum(soilToFert);
	convertToNum(fertToWater);
	convertToNum(waterToLight);
	convertToNum(lightToTemp);
	convertToNum(tempToHum);
	convertToNum(humToLoc);

	// idx 0: destination range start
	// idx 1: source range start
	// idx 2: range (including start, not including end)

	const step = (seed, conversion) => {
		for (let i = 0; i < conversion.length; i++) {
			const [minDest, minSource, range] = conversion[i];
			if (seed >= minSource) {
				const maxSource = minSource + range - 1;

				// Any source numbers that aren't mapped correspond to the same destination number.
				if (seed > maxSource) continue;

				// seed is in range
				const offset = minDest - minSource;
				return seed + offset;
			}
		}
		return seed;
	};

	let ans = Infinity;

	for (const seed of seeds) {
		const soil = step(seed, seedToSoil);
		const fertilizer = step(soil, soilToFert);
		const water = step(fertilizer, fertToWater);
		const light = step(water, waterToLight);
		const temp = step(light, lightToTemp);
		const humidity = step(temp, tempToHum);
		const location = step(humidity, humToLoc);

		ans = Math.min(ans, location);
	}

	return ans;
}

function P2(arr) {
	const input = arr.split("\n\n");
	const seeds = input[0].split(": ")[1].split(" ");
	const seedToSoil = input[1].split(":\n")[1].split("\n");
	const soilToFert = input[2].split(":\n")[1].split("\n");
	const fertToWater = input[3].split(":\n")[1].split("\n");
	const waterToLight = input[4].split(":\n")[1].split("\n");
	const lightToTemp = input[5].split(":\n")[1].split("\n");
	const tempToHum = input[6].split(":\n")[1].split("\n");
	const humToLoc = input[7].split(":\n")[1].split("\n");

	for (const i in seedToSoil) seedToSoil[i] = seedToSoil[i].split(" ");
	for (const i in soilToFert) soilToFert[i] = soilToFert[i].split(" ");
	for (const i in fertToWater) fertToWater[i] = fertToWater[i].split(" ");
	for (const i in waterToLight) waterToLight[i] = waterToLight[i].split(" ");
	for (const i in lightToTemp) lightToTemp[i] = lightToTemp[i].split(" ");
	for (const i in tempToHum) tempToHum[i] = tempToHum[i].split(" ");
	for (const i in humToLoc) humToLoc[i] = humToLoc[i].split(" ");

	for (let i = 0; i < seeds.length; i++) seeds[i] = Number(seeds[i]);

	convertToNum(seedToSoil);
	convertToNum(soilToFert);
	convertToNum(fertToWater);
	convertToNum(waterToLight);
	convertToNum(lightToTemp);
	convertToNum(tempToHum);
	convertToNum(humToLoc);

	// idx 0: destination range start
	// idx 1: source range start
	// idx 2: range (including start, not including end)

	const step = (seed, conversion) => {
		for (let i = 0; i < conversion.length; i++) {
			const [minDest, minSource, range] = conversion[i];
			if (seed >= minSource) {
				const maxSource = minSource + range - 1;

				// Any source numbers that aren't mapped correspond to the same destination number.
				if (seed > maxSource) continue;

				// seed is in range
				const offset = minDest - minSource;
				return seed + offset;
			}
		}
		return seed;
	};

	let ans = Infinity;

	for (let i = 0; i < seeds.length; i += 2) {
		const seed = seeds[i];
		const currentRange = seeds[i + 1];

		for (let j = 0; j < currentRange; j++) {
			const currentSeed = seed + j;
			const soil = step(currentSeed, seedToSoil);
			const fertilizer = step(soil, soilToFert);
			const water = step(fertilizer, fertToWater);
			const light = step(water, waterToLight);
			const temp = step(light, lightToTemp);
			const humidity = step(temp, tempToHum);
			const location = step(humidity, humToLoc);

			ans = Math.min(ans, location);
		}
	}

	return ans;
}

// console.log(P1(parsedExample));
// console.log(P1(parsedInput));
// console.log(P2(parsedExample));

// EXTREME BRUTE FORCE: UNCOMMENT AT YOUR OWN RISK!!
// console.log(P2(parsedInput));
