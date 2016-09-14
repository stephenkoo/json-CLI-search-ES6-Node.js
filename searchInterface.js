"use strict"
// Readline enables user input through the console
const readline = require("readline")
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
// Requires external files
const logic = require("./searchLogic")
const text = require("./searchText")

// Globale variables to store current user selections
let databaseSelected
let fieldSelected

// Starts the app
exports.runZenSearch = () => {
	console.log(text.intro)
	chooseDatabase()
}

// Let's user select a database
let chooseDatabase = () => {
	rl.question(text.whatDatabase, (answer) => {
		switch(answer) {
			case "0":
			case "1":
			case "2":
				let databaseName = logic.jsonFiles[answer]
				console.log(text.confirmDatabase(databaseName))
				databaseSelected = eval(databaseName)
				chooseField()
				break
			case "q":
				console.log(text.quitSearch)
				return rl.close()
			default:
				console.log(text.errorDatabase)
				chooseDatabase()
				break
		}
	})
}

// Let's user choose a field
let chooseField = () => {
	let databaseFields = Object.keys(databaseSelected[0])
	rl.question(text.whatField(databaseFields), (answer) => {
		switch(answer) {
			case "b":
				chooseDatabase()
				break
			case "q":
				console.log(text.quitSearch)
				return rl.close()
			default:
				if (answer in databaseSelected[0]) {
					fieldSelected = answer
					console.log(text.confirmField(fieldSelected))
					chooseSearch()
				} else {
					console.log(text.errorField)
					chooseField()
				}
				break
		}
	})
}

// Let's user enter search term
let chooseSearch = () => {
	rl.question(text.whatTerm, (answer) => {
		switch(answer) {
			case "back":
				chooseField()
				break
			default:
				logic.searchDatabase(databaseSelected, fieldSelected, answer)
				chooseSearch()
				break
		}
	})
}

// Runs the ZenSeach program
exports.runZenSearch()
