const fs = require("fs");

function parseTextFileIntoArray(inputPath) {
	let file;
	try {
		file = fs.readFileSync(inputPath);
	} catch (err) {
		console.error("Error has occurred in parsing the text file.");
	}

	return file.toString().trim().split("\n");
}

module.exports = parseTextFileIntoArray;
