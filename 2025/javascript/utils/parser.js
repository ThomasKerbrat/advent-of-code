// Parses a given file into lines using the current OS end of line character

"use strict";

const fs = require("fs");
const os = require("os");

export function parseFile(filePath) {
	return fs.readFileSync(filePath, "utf-8")
		.split(os.EOL)
		.filter(line => line != "");
};
