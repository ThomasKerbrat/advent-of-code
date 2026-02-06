"use strict";

class Logger {
	emit = true;
	sb = [];
	sep = "  ";

	on() {
		this.emit = true;
		return this;
	}

	off() {
		this.emit = false;
		return this;
	}

	push(...strs) {
		if (this.emit === false) return this;
		this.sb.push(...strs);
		return this;
	}

	log() {
		if (this.emit === false) return this;
		process.stdout.write(this.sb.join(this.sep));
		this.sb.length = 0;
		return this;
	}
}

module.exports = new Logger();
