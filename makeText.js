/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');

function generateTextFromFile(file) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${file}:\n ${err}`);
			process.exit(1);
		}
		else {
			// console.log(data);
			handleOutput(data, file);
		}
	});
}

async function generateTextFromUrl(url) {
	try {
		let res = await axios.get(url);
		handleOutput(res.data, url);
	} catch (err) {
		console.log(`Error fetching ${url}:\n ${err}`);
		process.exit(1);
	}
}

function handleOutput(data, source) {
	const mm = new markov.MarkovMachine(data);
	console.log(`Generated text from ${source}:\n ${mm.makeText()}`);
}

// try {
let source = process.argv[2];
let path = process.argv[3];
if (source === 'file') {
	generateTextFromFile(path);
}
else if (source === 'url') {
	generateTextFromUrl(path);
}
else {
	// } catch (err) {
	console.log(`Unknown method: ${source}`);
	process.exit(1);
}
// }
