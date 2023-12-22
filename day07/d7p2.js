const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

const CARDS = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
const HANDS = ["HC", "1P", "2P", "3OAK", "FH", "4OAK", "5OAK"];

function findHandType(hand) {
	const counts = {};
	let jokerCount = 0;

	for (const card of hand.cards) {
		if (card === "J") {
			jokerCount++;
			continue;
		}

		if (counts[card]) counts[card]++;
		else counts[card] = 1;
	}

	if (jokerCount > 0) {
		let highestCountCard = null;
		for (const card in counts) {
			const currentCount = counts[card];

			if (highestCountCard === null) highestCountCard = card;
			else if (currentCount > counts[highestCountCard])
				highestCountCard = card;
			else if (currentCount === counts[highestCountCard]) {
				if (CARDS.indexOf(card) > CARDS.indexOf(highestCountCard))
					highestCountCard = card;
			}
		}

		counts[highestCountCard] += jokerCount;
	}

	const repetitions = Object.values(counts);

	if (jokerCount === 5) hand.type = "5OAK";
	else if (repetitions.includes(5)) hand.type = "5OAK";
	else if (repetitions.includes(4)) hand.type = "4OAK";
	else if (repetitions.includes(3) && repetitions.includes(2))
		hand.type = "FH";
	else if (repetitions.includes(3)) hand.type = "3OAK";
	else if (repetitions.filter((el) => el === 2).length === 2)
		hand.type = "2P";
	else if (repetitions.filter((el) => el === 2).length === 1)
		hand.type = "1P";
	else hand.type = "HC";
}

function Part2(arr) {
	const allHands = [];

	for (const hand of arr) {
		const [cards, bid] = hand.split(" ");
		allHands.push({
			cards: cards.split(""),
			bid: parseInt(bid),
		});
	}

	for (const hand of allHands) findHandType(hand);

	// earlier cards in the hand get ranked first
	// we want to give more weight to the earlier cards
	// we can do this by assigning a value to each card based on the index of the card in the cards array

	for (const hand of allHands) {
		hand.value = 0;

		// earlier indexes are worth more so we need to reverse a copy of the array of cards
		const cardsCopy = hand.cards.slice().reverse();

		for (let i = 0; i < cardsCopy.length; i++) {
			const currentCard = cardsCopy[i];
			hand.value += CARDS.indexOf(currentCard) * 1000 ** i;
		}
	}

	// sort the hands by rank first then value
	// this will put the highest ranked hands first

	allHands.sort((a, b) => {
		if (HANDS.indexOf(a.type) > HANDS.indexOf(b.type)) return 1;
		else if (HANDS.indexOf(a.type) < HANDS.indexOf(b.type)) return -1;
		else {
			if (a.value > b.value) return 1;
			else if (a.value < b.value) return -1;
			else return 0;
		}
	});

	// We then determine the total winnings by adding up the result of multiplying each hand's bid with its rank
	// The multiplier is the total number of hands

	let totalWinnings = 0;

	let rank = 1;
	for (let i = 0; i < allHands.length; i++) {
		const hand = allHands[i];
		console.log(hand.cards, hand.value, hand.type, hand.bid);
		totalWinnings += hand.bid * rank;
		rank++;
	}

	return totalWinnings;
}

console.log(Part2(parsedArrayEx1));
console.log(Part2(inputArray));
