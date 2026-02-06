"use strict";

module.exports = {
	factors,
};

/**
 * Computes the factors of a given number.
 * @param {number} n An integer number expected to be positive
 */
function factors(n) {
	if (n <= 0) {
		throw new RangeError(`utils/math.factor: argument is expected to be positive`);
	}

	const result = [];

	for (let i = 1; i <= n; i++) {
		if (n % i === 0) {
			result.push(i);
		}
	}

	return result;
}
