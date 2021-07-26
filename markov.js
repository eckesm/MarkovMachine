/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter(c => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO

		const possibleNextWords = {};

		function addWordToMap(word, nextWord) {
			if (word in possibleNextWords) {
			}
			else {
				possibleNextWords[word] = [];
			}

			if (possibleNextWords[word].indexOf(nextWord) === -1) {
				possibleNextWords[word].push(nextWord);
			}
		}

		for (let i = 0; i < this.words.length; i++) {
			if (i === this.words.length - 1) {
				addWordToMap(this.words[i], null);
			}
			else {
				addWordToMap(this.words[i], this.words[i + 1]);
			}
		}

		// console.log(possibleNextWords);
		this.possibleNextWords = possibleNextWords;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let text;
		let lastWord;
		let nextWord;
		let nextWordList;
		let minimum = false;
		let finished = false;

		const keys = Object.keys(this.possibleNextWords);

		for (let i = 1; finished === false; i++) {
			if (i === 1) {
				lastWord = keys[Math.floor(Math.random() * keys.length)];
				text = lastWord;
			}
			else {
				nextWordList = this.possibleNextWords[lastWord];
				nextWord = nextWordList[Math.floor(Math.random() * nextWordList.length)];
				if (nextWord !== null) {
					text = text + ' ' + nextWord;
					lastWord = nextWord;
				}
				else {
					if (minimum === false) {
						text = text + '. ';
						lastWord = keys[Math.floor(Math.random() * keys.length)];
					}
					else {
						text = text + '.';
						finished = true;
					}
				}
			}
			if (i === numWords - 1) {
				minimum = true;
			}
		}
		// console.log(text);
		this.text = text;
	}
}

// let mm = new MarkovMachine('the cat in the hat');
// let mm = new MarkovMachine(
// 	'I would not like them Here or there. I would not like them Anywhere. I do not like Green eggs and ham. I do not like them, Sam-I-am'
// );
// mm.makeText();
// console.log(mm.possibleNextWords);

module.exports = { MarkovMachine };
