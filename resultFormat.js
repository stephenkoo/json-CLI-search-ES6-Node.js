exports.makeReadable = (json, counter) => {
	// Turn arrays into a single line when passed through JSON.stringify()
	let condenseArrays = (key, value) => {
		if (value.constructor === Array) {
			return value.join(", ")
		}
		return value
	}
	// To align all result values, the shorter the key's string, the more tabs are added.
	let alignTabs = (str) => {
		if (str.indexOf(": ") < 5) {
			return ":\t\t\t\t"
		} else if (str.indexOf(": ") < 14) {
			return ":\t\t\t"
		} else if (str.indexOf(": ") < 22) {
			return ":\t\t"
		} else {
			return ":\t"
		}
	}
	let jsonString = JSON.stringify(json, condenseArrays, 2);
	// Makes stringified JSON more human-readable
	jsonString = jsonString
		.replace(/"/g, "")
		.replace(/,(?=\n)/g, "")
		.replace(/: /g, alignTabs(jsonString))
		.replace(/^{/, `------------Result ${counter}------------`)
		.replace(/}$/, "")
	return jsonString
}