const { MarkovMachine } = require('./markov');

let mm;
beforeEach(function() {
	mm = new MarkovMachine(
		'I would not like them Here or there. I would not like them Anywhere. I do not like Green eggs and ham. I do not like them, Sam-I-am'
	);
});

describe('MarkovMachine', function() {
	test('possibleNextWords is object', function() {
		expect(mm.possibleNextWords).toEqual(expect.any(Object));
	});
	test('text is string', function() {
		mm.makeText();
		expect(mm.text).toEqual(expect.any(String));
	});
});
