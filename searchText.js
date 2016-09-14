"use strict"

const logic = require("./searchLogic")

module.exports = {
	// Introduction message
	intro: `
Welcome to ZenSearch
`,
	// Quit message
	quitSearch: `
Bye! ZenSearch exitted.
`,
	// Database selection message
	whatDatabase: `
Enter the number of the database you want to search:
	0) ${logic.jsonFiles[0]}
	1) ${logic.jsonFiles[1]}
	2) ${logic.jsonFiles[2]}

Type "q" to quit ZenSearch.
`,
	// Database confirmation message
	confirmDatabase(database) {
		return `
Selected the ${database} database.
`
	},
	// Unrecognized database input message 
	errorDatabase: `
Unrecognized input. Please enter the numbers listed or 'q' to quit.
`,
	// Field selection message
	whatField(fields) {
		return `
Type the field you want to search in:
	
	${fields.join(`\n\t`)}

Type "b" to go back, or "q" to quit ZenSearch.
`
	},
	// Field confirmation message
	confirmField(field) {
		return `
Selected the ${field} field.
`
	},
	// Unrecognized field input message 
	errorField: `
Unrecognized field. Please type one of the fields listed, 'b' to return, or 'q' to quit.
`,
	// Search selection message
	whatTerm: `
Enter your search term or type "back" to return:
`
}