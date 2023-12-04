"use strict";

const fs = require("node:fs");
const os = require("node:os");
const input = fs.readFileSync("./inputs/day_01.txt", "utf-8");

const digits = {
	"one":   "1", "1": "1",
	"two":   "2", "2": "2",
	"three": "3", "3": "3",
	"four":  "4", "4": "4",
	"five":  "5", "5": "5",
	"six":   "6", "6": "6",
	"seven": "7", "7": "7",
	"eight": "8", "8": "8",
	"nine":  "9", "9": "9",
};

let calibrations = 0;
let first_digit = null;
let last_digit = null;

for (let i = 0; i < input.length; i++) {
	const next_digit = get_digit(input, i);

	if (next_digit) {
		if (first_digit === null) {
			first_digit = next_digit;
		}

		last_digit = next_digit;
	}

	if (input[i] === os.EOL) {
		const _ = Number(first_digit[1] + last_digit[1]);
		calibrations += _;
		// console.log(first_digit, last_digit, _);

		first_digit = null;
		last_digit = null;
	}
}

console.log(calibrations);

// Get digit from the input string

/**
 * @param {string} input The input string
 * @param {number} offset At which index to start looking
 * @return {number | null} The number found (in letter of digit form) or null if nothing found
 */
function get_digit(input, offset) {
	candidate_loop:
	for (let candidate of Object.keys(digits)) {
		if (candidate.length === 1 && input[offset] === candidate) {
			return [candidate, digits[candidate]];
		}

		for (let i = 0; i < candidate.length; i++) {
			if (input[offset + i] !== candidate[i]) {
				continue candidate_loop;
			}
		}

		return [candidate, digits[candidate]];
	}
}

