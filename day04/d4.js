const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

function Scratchcards(arr) {
	let totalScore = 0;

	for (const line of arr) {
		// Each line is one card.
		let cardScore = 0;

		const [winningNums, cardNums] = line.split(": ")[1].split(" | ");
		const winningNumsArr = winningNums
			.split(" ")
			.filter((num) => num !== "");
		const cardNumsArr = cardNums.split(" ").filter((num) => num !== "");

		for (const num of cardNumsArr) {
			if (winningNumsArr.includes(num)) {
				if (cardScore === 0) {
					cardScore = 1;
				} else {
					cardScore *= 2;
				}
			}
		}

		totalScore += cardScore;
	}

	return totalScore;
}

console.log(Scratchcards(parsedArrayEx1));
console.log(Scratchcards(inputArray));
