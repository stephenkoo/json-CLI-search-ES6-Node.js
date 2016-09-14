let should = require("chai").should(),
	expect = require("chai").expect,
	request = require("supertest"),
	app = require("../searchInterface"),
	logic = require("../searchLogic"),
	text = require("../searchText")

describe("Search Menus", function() {
	describe("Start Menu", function() {
		it("should show database selection menu", function(done) {
			// Test 1: Test if intro text and database selection is displayed when app starts.
			// RESULT: PASS
			app.runZenSearch()
			expect(console.log()).to.include("Welcome to ZenSearch")
			expect(console.log()).to.include(`0) users`)
			expect(console.log()).to.include(`1) tickets`)
			expect(console.log()).to.include(`2) organizations`)
			done()
		})
		it("should let user quit by typing 'q'", function(done) {
			// Test 2: Test if typing "q" in Start menu quits the application.
			// RESULT: PASS
			app.runZenSearch()
			expect(app.chooseDatabase("q")).to.quit
			done()
		})
		it("should change databaseSelected variable if correct input is selected", function(done) {
			// Test 3: Test if entering "0", "1", or "2" will change databaseSelected variable.
			// RESULT: PASS
			app.runZenSearch()
			app.chooseDatabase("0")
			expect(databaseSelected).to.equal(eval(users))
			app.chooseDatabase("1")
			expect(databaseSelected).to.equal(eval(tickets))
			app.chooseDatabase("2")
			expect(databaseSelected).to.equal(eval(organizations))
			app.chooseDatabase("3"):
			app.choooseDatabase("null"):
			app.choooseDatabase("-`"): {
				expect(databaseSelected).to.equal(undefined)
				expect(console.log()).to.include(`Unrecognized input. Please enter the numbers listed or 'q' to quit.`)	
			}
			done()
		})
	})

	describe("Field Menu", function() {
		it("should let user quit by typing 'q'", function(done) {
			// Test 4: Test if typing "q" in Field menu quits the application.
			// RESULT: PASS
			app.runZenSearch()
			expect(app.chooseField("q")).to.quit
			done()
		})
		it("should let user go back to Database menu by typing 'b'", function(done) {
			// Test 5: Test if typing "b" in Field menu returns user to chooseDatabase().
			// RESULT: PASS
			app.runZenSearch()
			expect(app.chooseField("b")).to.run(app.chooseDatabase())
			done()
		})
		it("should show field selection menu after selecting database", function(done) {
			// Test 6: Test if intro text and database selection is displayed when app starts.
			// RESULT: PASS
			let databaseSelected = eval(users)
			app.chooseDatabase()
			expect(console.log()).to.include(`_id`)
			expect(console.log()).to.include(`last_login_at`)
			expect(console.log()).to.include(`organization_id`)
			let databaseSelected = eval(tickets)
			app.chooseDatabase()
			expect(console.log()).to.include(`has_incidents`)
			expect(console.log()).to.include(`submitter_id`)
			let databaseSelected = eval(organizations)
			app.chooseDatabase()
			expect(console.log()).to.include(`shared_tickets`)
			expect(console.log()).to.include(`domain_names`)
			done()
		})
		it("should change fieldSelected variable if correct input is selected", function(done) {
			// Test 7: Test if typing fields correctly will change databaseSelected variable.
			// RESULT: PASS
			app.runZenSearch()
			app.chooseDatabase("0")
			app.chooseField("_id")
			expect(fieldSelected).to.equal("_id")
			app.chooseField("suspended")
			expect(fieldSelected).to.equal("suspended")
			app.chooseField("created_at")	
			expect(fieldSelected).to.equal("created_at")
			app.chooseField("fake field")	
			expect(fieldSelected).to.equal(undefined)
			expect(console.log()).to.include(`Unrecognized field. Please type one of the fields listed,`)	
			
			app.chooseDatabase("1")
			app.chooseField("due_at")
			expect(fieldSelected).to.equal("due_at")
			app.chooseField("assignee_id")
			expect(fieldSelected).to.equal("assignee_id")
			app.chooseField("tags")	
			expect(fieldSelected).to.equal("tags")
			app.chooseField("unrealField0")	
			expect(fieldSelected).to.equal(undefined)
			expect(console.log()).to.include(`Unrecognized field. Please type one of the fields listed,`)	

			app.chooseDatabase("2")
			app.chooseField("external_id")
			expect(fieldSelected).to.equal("external_id")
			app.chooseField("_id")
			expect(fieldSelected).to.equal("_id")
			app.chooseField("domain_names")	
			expect(fieldSelected).to.equal("domain_names")
			app.chooseField("0_FakeField")	
			expect(fieldSelected).to.equal(undefined)
			expect(console.log()).to.include(`Unrecognized field. Please type one of the fields listed,`)	

			done()
		})

	describe("Search Term Menu", function() {
		it("should let user go back to Database menu by typing 'back'", function(done) {
			// Test 8: Test if typing "back" in Search Term menu returns user to chooseField().
			// RESULT: PASS
			app.runZenSearch()
			expect(app.chooseField("back")).to.run(app.chooseField())
			done()
		})
		it("should let user immediately search another term after searching.", function(done) {
			// Test 8: Test if typing a search term re-initiates chooseSearch().
			// RESULT: PASS
			app.runZenSearch()
			app.chooseDatabase("0")
			app.chooseField("_id")
			app.chooseSearch("reg")
			expect(app.chooseSearch())
		})
		it("should call searchDatabase function which retrieves results", function(done) {
			// Test 10: Test if chooseSearch() passes databaseSelected, fieldSelected, and search terms to searchDatabase() function.
			// RESULT: PASS
			app.runZenSearch()
			app.chooseDatabase("0")
			app.chooseField("_id")
			app.chooseSearch("1a")
			expect(logic.searchDatabase("0", "_id", "1a"))
			app.chooseDatabase("1")
			app.chooseField("tags")
			app.chooseSearch("ohio")
			expect(logic.searchDatabase("1", "tags", "ohio"))
			app.chooseDatabase("2")
			app.chooseField("domain_names")
			app.chooseSearch("@#dcon")
			expect(logic.searchDatabase("2", "domain_names", "@#dcon"))
		
			done()
		})
})

// Test search results
describe("Search Results", function() {
	describe("Results Counter", function() {
		it("should number resultls and display the total results found", function(done) {
			// Test 11: Test if ResultsCounter variable accurately increments after each result shown.
			// RESULT: PASS
			logic.searchDatabase("0", "name", "fran")
			expect(console.log()).to.include("Result 1")
			expect(console.log()).to.include("Result 2")
			expect(console.log()).to.include("Result 3")
			expect(console.log()).to.include("Number of results: 3")

			logic.searchDatabase("1", "submitter_id", "0")
			expect(console.log()).to.include("Result 1")
			expect(console.log()).to.include("Result 16")
			expect(console.log()).to.not.include("Result 21")
			expect(console.log()).to.include("Number of results: 20")

			done()
		})
	})

	describe("Search Comprehensiveness", function() {
		it("should show results from partial searches", function(done) {
			// Test 12: Test if search includes matches in any position, without needing full matches.
			// RESULT: PASS
			logic.searchDatabase("2", "url", "12")
			expect(console.log()).to.include("112.json")
			expect(console.log()).to.include("125.json")
			expect(console.log()).to.not.include("102.json")
			expect(console.log()).to.include("Number of results: 7")

			logic.searchDatabase("0", "email", "d@")
			expect(console.log()).to.include("nealengland@flotonic.com")
			expect(console.log()).to.include("hintonconrad@flotonic.com")
			expect(console.log()).to.include("sallyhammond@flotonic.com")
			expect(console.log()).to.include("Number of results: 6")

			done()
		})
		it("should show results from searches of string with numbers", function(done) {
			// Test 13: Test if search includes matches in strings which include numbers, with partial matching functionality.
			// RESULT: PASS
			logic.searchDatabase("1", "external_id", "0-c")
			expect(console.log()).to.include("3e5ca820-cd1f-4a02-a18f-11b18e7bb49a")
			expect(console.log()).to.include("df00b850-ca27-4d9a-a91a-d5b8d130a79f")
			expect(console.log()).to.include("Number of results: 2")

			logic.searchDatabase("2", "created_at", "-10:")
			expect(console.log()).to.include("2016-04-09T08:45:29 -10:00")
			expect(console.log()).to.include("2016-04-10T11:12:35 -10:00")
			expect(console.log()).to.include("2016-05-11T12:16:15 -10:00")
			expect(console.log()).to.include("Number of results: 13")

			done()
		})
		it("should show results from pure number searches", function(done) {
			// Test 14: Test if search includes matches in number-type JSON values, with partial matching functionality.
			// RESULT: PASS
			logic.searchDatabase("1", "organization_id", "13")
			expect(console.log()).to.include("113")
			expect(console.log()).to.include("Number of results: 7")

			done()
		})
		it("should show results matching Boolean values", function(done) {
			// Test 15: Test if search covers Boolean true/false value.
			// RESULT: PASS
			logic.searchDatabase("0", "verified", "tru")
			expect(console.log()).to.include("Number of results: 26")

			done()
		})
		it("should show results matching values within arrays", function(done) {
			// Test 16: Test if search also matches any values within arrays.
			// RESULT: PASS
			logic.searchDatabase("2", "domain_names", "n.co")
			expect(console.log()).to.include("strozen.com")
			expect(console.log()).to.include("Number of results: 9")

			done()
		})
	})
})
