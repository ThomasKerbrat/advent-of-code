"use strict";

import path from "node:path";
import logger from "../utils/logger.js";
import { parseFile } from "../utils/parser.js";
import * as math from "../utils/math.js";

const inputPath = path.join("../../inputs/day02.txt");
const inputFile = parseFile(inputPath);
const input = parseInput(inputFile);

console.log(part1(input));
console.log(part2(input));

function part1(input) {
	let result = 0;

	for (const range of input) {
		for (let i = range.f; i <= range.l; i++) {
			const id = String(i);
			
			if (id.length % 2 !== 0) {
				continue;
			}

			const half1 = id.substring(0, id.length / 2);
			const half2 = id.substring(id.length / 2);

			if (half1 === half2) {
				result += i;
			}
		}
	}

	return result;
}

function part2(input) {
	let result = 0;
	logger.off();

	for (const range of input) {
		logger.log(`Testing range ${range.f}-${range.l}`);
		for (let i = range.f; i <= range.l; i++) {
			const id = String(i);
			const factors = math.factors(id.length);
			logger.push(` ${id}`);

			factors.length = factors.length - 1;
			logger.push(String(factors));

			factorSearch:
			for (let fac of factors) {
				const steps = id.length / fac, half1 = id.substring(0, fac);
				let mismatch = false;
				let j = 1, half2;

				while (!mismatch && j < steps) {
					half2 = id.substring(fac * j, fac * (j + 1));
					logger.push(`(${half1} ${half2})`);

					if (half1 !== half2) {
						mismatch = true;
						logger.push(`miss`);
					}

					j++;
				}

				if (mismatch === false) {
					result += i;
					logger.log("+++");
					break factorSearch;
				}
			}

			logger.log();
		}
	}

	return result;
}

function parseInput(lines) {
	const input = [];
	const ranges = lines[0].split(",");

	for (const range of ranges) {
		const [f, l] = range.split("-");
		input.push({
			f: Number(f),
			l: Number(l),
		});
	}

	return input;
};
