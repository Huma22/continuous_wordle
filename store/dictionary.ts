import words from 'an-array-of-english-words'; // Assuming you have installed this npm package

const createWordsArray = (n: number): string[] => {
  const filteredWords = words.filter((word) => word.length === n);
  const wordsArray = filteredWords.slice(0, 100); // Taking only first 100 words
  return wordsArray;
}

export const targetFiveWords = createWordsArray(5); 
export const targetSixWords = createWordsArray(6); 
export const targetSevenWords = createWordsArray(7); 

const AllWordsArray = (n: number): string[] => {
  const filteredWords = words.filter((word) => word.length === n);
  return filteredWords;
}

export const dictionarySix = AllWordsArray(6); 
export const dictionarySeven = AllWordsArray(7); 
export const dictionaryEight= AllWordsArray(8); 
export const dictionaryFive = AllWordsArray(5); 

