const parseTextFileIntoArray = require("../utils/parseText");
const parsedArrayEx1 = parseTextFileIntoArray("./example1.txt");
// const parsedArrayEx2 = parseTextFileIntoArray("./example2.txt");
const inputArray = parseTextFileIntoArray("./input.txt");

const differences = (nums) => {
	const res = [];
	for (let i = 0; i < nums.length - 1; i++) {
		const diff = nums[i + 1] - nums[i];
		res.push(diff);
	}
	return res;
};

function Day9Part1(arr) {
	// THIS WORKED FOR THE TEST CASE. RAN OUT OF MEMORY FOR THE INPUT. TRYING A DIFFERENT APPROACH.
	// let extrapolatedTotal = 0;
	// for (const line of arr) {
	// 	const nums = line
	// 		.split(/\D/)
	// 		.filter((el) => el !== "")
	// 		.map((num) => Number(num));
	// 	const sequences = { 1: [...nums] };
	// 	let seqNum = 2;
	// 	let diffs = [];
	// 	for (let i = 0; i < nums.length - 1; i++) {
	// 		const diff = nums[i + 1] - nums[i];
	// 		diffs.push(diff);
	// 	}
	// 	sequences[seqNum] = [...diffs];
	// 	seqNum++;
	// 	while (true) {
	// 		const currentDiff = [];
	// 		for (let i = 0; i < diffs.length - 1; i++) {
	// 			const diff = diffs[i + 1] - diffs[i];
	// 			currentDiff.push(diff);
	// 		}
	// 		sequences[seqNum] = [...currentDiff];
	// 		diffs = currentDiff;
	// 		if (parseInt(diffs.join("")) === 0) break;
	// 		seqNum++;
	// 	}
	// 	// At this point of code we've gotten the sequences of differences down to a line of zeroes.
	// 	let extrapolatedVal = 0;
	// 	while (seqNum > 1) {
	// 		// we want to go backward through the sequences, starting with the last one.
	// 		const current = sequences[seqNum];
	// 		const currentSequenceLastValue = current[current.length - 1];
	// 		const prevSeq = sequences[seqNum - 1];
	// 		const lastValPrevSeq = prevSeq[prevSeq.length - 1];
	// 		extrapolatedVal = currentSequenceLastValue + lastValPrevSeq;
	// 		prevSeq.push(extrapolatedVal);
	// 		seqNum--;
	// 	}
	// 	extrapolatedTotal += extrapolatedVal;
	// }
	// return extrapolatedTotal;
	let res = 0;
	for (let i = 0; i < arr.length; i++) {
		const input = arr[i].split(/\D/).map((n) => Number(n));
		const sequences = [input];
		let nums = input;
		while (parseInt(nums.join("")) !== 0) {
			nums = differences(nums);
			sequences.push(nums);
		}
		for (let i = sequences.length - 1; i >= 0; i--) {
			const seq = sequences[i];
			if (i === sequences.length - 1) {
				seq.push(0);
			} else {
				const nextSeq = sequences[i + 1];
				const nextExtrapolatedValue = seq.at(-1) + nextSeq.at(-1);
				seq.push(nextExtrapolatedValue);
			}
		}
		const firstSequence = sequences[0];
		res += firstSequence.at(-1);
	}
	return res;
}

console.log(Day9Part1(parsedArrayEx1));
// console.log(Day9Part1(inputArray));
