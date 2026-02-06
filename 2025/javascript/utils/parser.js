// Parses a given file into lines using the current OS end of line character

"use strict";

import fs from "node:fs";
import os from "node:os";

export function parseFile(filePath) {
	return fs.readFileSync(filePath, "utf-8")
		.split(os.EOL)
		.filter(line => line != "");
};
