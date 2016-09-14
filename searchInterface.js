"use strict"
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const logic = require("./searchLogic.js");
const text = require("./searchText.js");

let databaseSelected
let fieldSelected

let runZenSearch = () => {
	console.log(text.intro);
	chooseDatabase();
}

let chooseDatabase = () => {
	rl.question(text.whatDatabase, (answer) => {
		switch(answer) {
			case "0":
			case "1":
			case "2":
				let databaseName = logic.jsonFiles[answer]
				console.log(text.confirmDatabase(databaseName))
				databaseSelected = eval(databaseName);
				chooseField();
				break;
			case "q":
				console.log(text.quitSearch)
				return rl.close();
			default:
				console.log(text.errorDatabase)
				chooseDatabase();
				break;
		}
	});
}

let chooseField = () => {
	let databaseFields = Object.keys(databaseSelected[0])
	rl.question(text.whatField(databaseFields), (answer) => {
		switch(answer) {
			case "b":
				chooseDatabase();
				break;
			case "q":
				console.log(text.quitSearch)
				return rl.close();
			default:
				if (answer in databaseSelected[0]) {
					fieldSelected = answer
					console.log(text.confirmField(fieldSelected))
					chooseSearch();
				} else {
					console.log(text.errorField)
					chooseField();
				}
				break;
		}
	});
};

let chooseSearch = () => {
	rl.question(text.whatTerm, (answer) => {
		switch(answer) {
			case "back":
				chooseField();
				break;
			default:
				// console.log(count)
				logic.searchDatabase(databaseSelected, fieldSelected, answer);
				// console.log(text.afterSearch(count))
				chooseSearch()
				break;
		}
	})
}

// Runs the ZenSeach program
runZenSearch();
