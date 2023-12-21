const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");
const { sumArray } = require("../utils/library");

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

function ScratchcardsPart2(arr) {
	const cardMap = {};

	for (const line of arr) {
		// First for loop to build up the cardMap.
		const cardNum = line.split(": ")[0].replace(/[^0-9]/g, "");
		cardMap[cardNum] = 1;
	}

	for (const line of arr) {
		// Second for loop to check the numbers on the card and to add scratchcards to the cardMap.
		const currentCardNum = line.split(": ")[0].replace(/[^0-9]/g, "");
		let copyCardNum = currentCardNum;

		const [winningNums, cardNums] = line.split(": ")[1].split(" | ");
		const winningNumsArr = winningNums
			.split(" ")
			.filter((num) => num !== "");
		const cardNumsArr = cardNums.split(" ").filter((num) => num !== "");

		for (const num of cardNumsArr) {
			if (winningNumsArr.includes(num)) {
				const numInstancesOfCurrentCard = cardMap[currentCardNum];

				copyCardNum++;
				if (cardMap[copyCardNum]) {
					cardMap[copyCardNum] += numInstancesOfCurrentCard;
				}
			}
		}
	}

	return sumArray(Object.values(cardMap));
}

// console.log(Scratchcards(parsedArrayEx1));
// console.log(Scratchcards(inputArray));
console.log(ScratchcardsPart2(parsedArrayEx1));
console.log(ScratchcardsPart2(inputArray));
