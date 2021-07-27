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
	// if (filename) {
	// 	fs.writeFile(filename, data, 'utf8', err => {
	// 		if (err) {
	// 			console.log(`Couldn't write to ${filename}:\n ${err}`);
	// 			process.exit(1);
	// 		}
	// 		else {
	//             console.log(`# no output, but ${filename} contains contents of ${source}`);
	// 		}
	// 	});
	// }
	// else {
	const mm = new markov.MarkovMachine(data);
	mm.makeText();
	console.log(`Generated text from ${source}:\n ${mm.text}`);
    console.log(mm.possibleNextWords)
	// }
}

try {
	let source = process.argv[2];
	let path = process.argv[3];
	if (source === 'file') {
		generateTextFromFile(path);
	}
	else if (source === 'url') {
		generateTextFromUrl(path);
	}
} catch (err) {
	console.log(`ERROR:\n ${err}`);
	process.exit(1);
}
