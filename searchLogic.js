"use strict"

const format = require("./resultFormat")

// Add any new JSON files into this array
let jsonFiles = ["users", "tickets", "organizations"]
// This imports the json files mentioned in the array.
for (let jsonName of jsonFiles) {
	global[jsonName] = require(`./json/${jsonName}`)
}

let resultCount = 0

// Loops through each item in JSON file
exports.searchDatabase = (jsonFile, field, value) => {
	for (let i in jsonFile) {
		let item = jsonFile[i]
		searchField(item, field, value)
	}
	console.log(`Number of results: ${resultCount}. Search another term?`)
	resultCount = 0
}

// Looks for matching field if it exists
let searchField = (object, field, value) => {
	let lowerCaseValue = value.toLowerCase()
	if (field in object) {
		searchTerm(object, field, lowerCaseValue)
	} else {
		console.log(`No results matching your search.`)
	}
}

// Looks for matching search value in field, even if stored within an array.
let searchTerm = (object, field, value) => {
	// Makes search term search-friendly
	let lowCaseTerm = value.toLowerCase()
	// Determines if an element matches the search term
	let includesTerm = (element) => {
		if (element.constructor === Array) {
			// Recursively  matches search term to values inside arrays.
			return element.some(includesTerm)
		} else if (typeof element === "string") {
			return element.toLowerCase().includes(lowCaseTerm)
		} else {
			// To match input (which is a string) with numbers, booleans, undefined, etc.
			return element.toString().includes(lowCaseTerm)
		}
	}
	if (includesTerm(object[field])) {
		resultCount++
		console.log(format.makeReadable(object, resultCount))
	}
}

exports.jsonFiles = jsonFiles