"use strict";

const fs = require("node:fs");
const os = require("node:os");
const input = fs.readFileSync("./inputs/day_01.txt", "utf-8");

let calibrations = 0;
let first_digit = null;
let last_digit = null;

for (let i = 0; i < input.length; i++) {
	const char = input[i];

	if (char >= "0" && char <= "9") {
		if (first_digit === null) {
			first_digit = char;
		}

		last_digit = char;
	}

	if (char === os.EOL) {
		const _ = Number(first_digit + last_digit);
		// console.log(_);
		calibrations += _;

		first_digit = null;
		last_digit = null;
	}
}

console.log(calibrations);

