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

	log(...strs) {
		if (this.emit === false) return this;
		if (strs.length) this.push(...strs);
		console.log(this.sb.join(this.sep));
		this.sb.length = 0;
		return this;
	}
}

export default new Logger();
