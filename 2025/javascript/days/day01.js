"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { question: q } = require("readline-sync");
const logger = require("../utils/logger");

const inputPath = path.join(__dirname, "../../inputs/day01.txt");
const inputFile = fs.readFileSync(inputPath, "utf-8");
const input = parseInput(inputFile);

console.log(part1(input));
console.log(part2(input));

function part1(input) {
	const sign = { 'L': -1, 'R': 1 };
	let cur = 50, res = 0;

	for (let line of input) {
		cur = (cur + sign[line.d] * line.n + 100) % 100;
		if (cur === 0) {
			res++;
		}
	}

	return res;
}

// 6291 trop bas
// 6342 top haut
function part2(input) {
	let dial = 50;
	let password = 0;

	for (let line of input) {
		for (let i = 0; i < line.n; i++) {
			dial += line.d === "L" ? -1 : 1;
			if (dial % 100 === 0) {
				password++;
			}
		}
	}

	return password;
}

function part2_V2(input) {
	let prev, cur = 50, pw = 0;
	let hundreds, diff;
	logger.off();

	for (let line of input) {
		// q();
		prev = cur;
		logger.push(line.l.padEnd(5));

		switch (line.d) {
			case "L":
				cur -= line.n;
				logger.push(`${prev}-${line.n}=${cur}`.padEnd(9));
				break;
			case "R":
				cur += line.n;
				logger.push(`${prev}+${line.n}=${cur}`.padEnd(9));
				break;
			default:
				throw new Error("Unexpected direction: " + line.d);
		}

		// I. B1 B2
		if (1 <= cur && cur <= 99) {
			logger.log();
			continue;
		}

		hundreds = Math.floor(Math.abs(cur) / 100);

		// II. D1 D2
		if (cur > 99) {
			diff = hundreds * 100;
			cur -= diff;
			pw += hundreds;
			logger.push(`-${diff}=${cur}`.padEnd(7), `pw=${pw}`).log();
			continue;
		}

		// III.
		if (cur < 0) {
			let lPw = "";
			// III a. C1
			if (prev === 0) {
				if (hundreds > 0) {
					pw += hundreds;
					lPw = `pw=${pw}`;
				}
			}
			// III b. C2
			else {
				pw += hundreds + 1;
				lPw = `pw=${pw}`;
			}

			diff = (hundreds + 1) * 100;
			cur += diff;
			logger.push(`+${diff}=${cur}`.padEnd(7), lPw).log();
			continue;
		}

		// IV.
		if (cur === 0) {
			// IV a. A1
			if (prev === 0) {
				throw new Error(`Unexpected ${prev} -> ${cur}`);
			}
			// IV b. A2
			else {
				pw++;
				logger.push(" ".repeat(7), `pw=${pw}`).log();
			}

			continue;
		}

		throw new Error("Unexpected value for cur: " + cur);
	}

	return pw;
}

function part2_V1(input) {
	let cur = 50, res = 0, prev, bIncr = false;
	console.log(`-> ${cur}`);

	for (let line of input) {
		prev = cur;
		bIncr = false;
		console.log(`\n${line.d + line.n}`);

		if (line.d === "L") {
			/* if (cur === 0) {
				res--;
				console.log(` at 0, res--`);
			} */

			cur -= line.n;
			console.log(` ${prev} - ${line.n} = ${cur}`);

			if (cur === 0) {
				res++;
				bIncr = true;
				console.log(` first try !! res++`);
			} else if (prev === 0 && cur >= -100) {
				cur += 100;
				console.log(` was too low, +100`);
			} else {
				while (cur < 0) {
					cur += 100;
					res++;
					bIncr = true;
					console.log(` was too low, +100 !! res++`);
				}
			}
		} else if (line.d === "R") {
			cur += line.n;
			console.log(` ${prev} + ${line.n} = ${cur}`);

			while (cur > 99) {
				cur -= 100;
				res++;
				bIncr = true;
				console.log(` was too high, -100 !! res++`);
			}
		}

		if (bIncr) {
			console.log(` res: ${res}`);
		}
	}

	return res;
}

function parseInput(inputFile) {
	const input = [];
	const lines = inputFile.split(os.EOL);

	for (let line of lines) {
		if (line === "") continue;
		input.push({
			l: line,
			d: line[0],
			n: Number(line.substring(1)),
		});
	}

	return input;
}
