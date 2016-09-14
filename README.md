# Command Line JSON Search Tool
Although a bit unconventional, I've written a CLI app in ES6 by utilising Node.js just so I can really play with ES6 and see how different it is writing back-end applications from writing in Ruby.
The only obstacle I didn't manage to overcome which might be easier in Ruby is to align results using `sprintf`, which unfortunately isn't a tool in Node.js.

## How to run
### Download the file
On [this GitHub repo](https://github.com/stephenkoo/json-search-challenge.git), click the top right download button to download the zip file.
Extract the file.

Alternatively, in your CLI (Terminal for OS X), navigate to your desired download directory and enter:

```bash
git clone https://github.com/stephenkoo/json-search-challenge.git
```

### Install Brew, Node, and Mocha
Skip these steps if you have already installed Brew and Node.

You can install Node using Brew. In your CLI, enter:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
npm i -g mocha
```

Or directly install Node:

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Run ES6 code using Node
In your CLI, navigate to this file's directory and enter:
```bash
npm i # For installing chai
node --harmony searchInterface.js
```
## How it works
The functions of the search app is separated into 4 js files:

1. searchInterface.js - Navigates users through the search application and receives user input.
2. searchLogic.js - How the app finds the relevant results when user selects a database, a field, and a value to look for.
3. searchText.js - Contains the (mostly) static notifications and messages displayed to users to add inform users of actions taken or errors.
4. resultFormat.js - Makes results even more human readable compared to the standard `JSON.stringify()`.

## Features of note

### Automated use of additional JSON files
To add another JSON file or re-order files (which file is associated to user input of 0, 1, 2, etc.), simply modify the `jsonFiles` array in `searchLogic.js`. A function automatically imports all JSON files included in the `jsonFiles` array.
(Unfortunately, the database selection text is partially static does not reflect this. See limitations below.)

### Search functionality
I have mindfully not written search code which also checks for accented characters of their normal character counterparts.

For instance, searching for "Rodriguez" will not show the results of "Francis Rodrigüez" or "MegaCörp". I omitted this to maintain the simplicity of the solution which gets the job done.

What the search does well:
- **Partial searches** - "Francis", "Fran", "2016"
- **Case-insensitive searches** - "TYLER", "rosa"
- **Array-value searches** - ["X", "K", "C", "D"]

### Human Readable
To make search results more human readable beyond a simple `JSON.stringify()`, I've shrinked JSON values which are in array form into single-liners, utilised regex to remove quotation marks and commas, curly brackets, and added result seperating lines.

## Limitations and Assumptions
### Listed fields
After a user selects a database, the fields shown are the fields of the first item in the database. This assumes the keys of the 0th JSON item is the same as all other items in JSON.

### Search result alignment
Because JavaScript doesn't come with printf like Ruby does, I had to write additional code to dynamically align JSON results. 

While I managed to mostly make the results look the way I wanted to, dynamically aligning the results was a bit tricky and I didn't manage to do that without the standard `printf` functionality.

It probably would've been easier to use [sprintf.js](https://www.npmjs.com/package/sprintf-js) to align results.

In the future, I hope to review why my `alignTabs` function doesn't accurately recognize the position of the colons separating keys from values, thus preventing tab alignment from working properly. 

### Automated numbering of databases in database selection text
I am not sure if it is possible to concisely integrate loops in JavaScript looop within text. Consequently, although the database names in the database selection prompt (i.e. `whatDatabase` inside `searchText.js`) changes based on how you order the databases in `jsonFiles` (inside `searchLogic.js`), it does not automatically add or subtract the number of databases to reflect changes.

