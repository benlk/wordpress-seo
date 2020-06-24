/**
 * Copyright (c) 2017 Błażej Kubiński
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Loops through an array of word endings and returns the longest ending that was matched at the end of the word.
 *
 * @param {string}      word       The word to check.
 * @param {string[]}    endings    The word endings to check.
 * @returns {string}    The longest matched ending.
 */
const endsInArr = function( word, endings ) {
	const matches = [];
	for ( const i in endings ) {
		if ( word.endsWith( endings[ i ] ) ) {
			matches.push( endings[ i ] );
		}
	}

	const longest = matches.sort( function( a, b ) {
		return b.length - a.length;
	} )[ 0 ];

	if ( longest ) {
		return longest;
	}
	return "";
};

/**
 * Checks if a word is longer than the word length threshold specified for a given suffix group. If the word length does not
 * meet the threshold, it is not stemmed.
 *
 * If it does meet the threshold, checks whether the word ends with one of the endings from the inputted array. If it does,
 * it removes the suffix from the end of the word.
 *
 * The length of the actual suffix is not always equal to the length of the checked ending, so suffix length is a separate
 * parameter. For example, the word 'rowerek' ends with -erek, one of the endings from the diminutive group. However, for
 * that ending, the suffix length is defined as 2 so only -ek is stemmed.
 *
 * @param {string} word            The word to stem.
 * @param {number} wordLength      The length of the word.
 * @param {string[]} wordEndings   The suffix group.
 * @param {number} suffixLength    The length of the suffix.
 *
 * @returns {string}               The stemmed word.
 */
const findSuffixInGroupAndStem = function( word, wordLength, wordEndings, suffixLength ) {
	if ( word.length > wordLength ) {
		const longestMatchedWordEnding = endsInArr( word, wordEndings );

		if ( longestMatchedWordEnding !== "" ) {
			return word.slice( 0, -suffixLength );
		}
	}
};

/**
 * Goes through all the suffix groups in a given class (i.e., diminutive, noun, verb, adjective/adverb or general) and
 * stems the word if a suffix is found and should be stemmed.
 *
 * @param {string}      word            The word to stem.
 * @param {Object}      suffixClass     The class of suffixes to check.
 * @returns {string}    The stemmed word.
 */
const findSuffixInClassAndStem = function( word, suffixClass ) {
	for ( const suffixGroup in suffixClass ) {
		if ( suffixClass.hasOwnProperty( suffixGroup ) ) {
			const wordShouldBeLongerThan = suffixClass[ suffixGroup ].wordShouldBeLongerThan;
			const wordEndings = suffixClass[ suffixGroup ].wordEndings;
			const suffixLength = suffixClass[ suffixGroup ].suffixLength;

			const stemmedWord = findSuffixInGroupAndStem( word, wordShouldBeLongerThan, wordEndings, suffixLength );

			if ( stemmedWord ) {
				return stemmedWord;
			}
		}
	}
};

/**
 * Stems adjective and adverb suffixes. After stemming the suffixes, looks for the superlative prefix 'naj' and stems it
 * as well if found. For example, in 'najsilniejsze', first the 'ejsze' is stemmed and then the 'naj'.
 *
 * @param {string}  word                The word to stem.
 * @param {Object}  morphologyData      The Polish morphology data file.
 *
 * @returns {string} The word with removed adjective/adverb suffixes
 */
const stemAdjectivesAndAdverbs = function( word, morphologyData ) {
	const stemmedWord = findSuffixInClassAndStem( word, morphologyData.externalStemmer.adjectiveAndAdverbSuffixes );

	if ( stemmedWord ) {
		// Remove superlative prefix if found
		if ( word.startsWith( morphologyData.externalStemmer.superlativePrefix ) ) {
			return stemmedWord.slice( 3 );
		}
		return stemmedWord;
	}
};

/**
 * Stems Polish words.
 *
 * @param {string}  word                The word to stem.
 * @param {Object}  morphologyData      The Polish morphology data file.
 * @param {Object}  dictionary          The dictionary stemmer with word-stem pairs.
 *
 * @returns {string} The stemmed word.
 */
export default function stem( word, morphologyData, dictionary ) {
	// Check if the word exists in the dictionary stemmer. If yes, replace the word with the base form of the word specified in the dictionary.
	let stemmedWord = dictionary[ word ];
	if ( stemmedWord ) {
		word = stemmedWord;
	}

	word.toLowerCase();

	// If the word is three characters long or shorter, the stem should be the same as the word.
	if ( word.length < 4 ) {
		return word;
	}

	/*
	 * Go through diminutive, noun, verb, and adjective stemming steps. If a suffix (and optional prefix in case of adjectives/adverbs)
	 *  is found, delete it and stop searching further.
	 */
	stemmedWord = findSuffixInClassAndStem( word, morphologyData.externalStemmer.diminutiveSuffixes );

	if ( ! stemmedWord ) {
		stemmedWord = findSuffixInClassAndStem( word, morphologyData.externalStemmer.nounSuffixes );
	}

	if ( ! stemmedWord ) {
		stemmedWord = findSuffixInClassAndStem( word, morphologyData.externalStemmer.verbSuffixes );
	}

	if ( ! stemmedWord ) {
		stemmedWord = stemAdjectivesAndAdverbs( word, morphologyData );
	}

	// If the word was stemmed in any of the previous steps, replace the word with the stem.
	if ( stemmedWord ) {
		word = stemmedWord;
	}

	// Find and stem general suffixes
	stemmedWord = findSuffixInClassAndStem( word, morphologyData.externalStemmer.generalSuffixes );

	if ( stemmedWord ) {
		return stemmedWord;
	}

	return word;
}
