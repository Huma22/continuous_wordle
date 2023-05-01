import { createSlice } from "@reduxjs/toolkit";

import { targetFiveWords, dictionaryFive, targetSixWords, dictionarySix, targetSevenWords } from "./dictionary";
import Letters, { LettersInterface, LettersObjectKeyType } from "./Letters";
import words from 'an-array-of-english-words'; // Assuming you have installed this npm package

const createWordsArray = (n: number): string[] => {
  const filteredWords = words.filter((word) => word.length === n);
  const wordsArray = filteredWords.slice(0, 100); // Taking only first 100 words
  return wordsArray;
}

const AllWordsArray = (n: number): string[] => {
  const filteredWords = words.filter((word) => word.length === n);
  return filteredWords;
}

interface GameState {
  gameStatus: string;
  numberOfLetters: number;
  numberOfRows: number;
  currentRow: number;
  boardState: Array<string>;
  boardStyles: Array<string>;
  dictionary: Array<string>;
  targetWord: string;
  lettersAndStyling: LettersInterface;
  animation: string;
  alertMessage: { message: string; duration: number };
}

const initialState: GameState = {
  gameStatus: "IN_PROGRESS",
  numberOfLetters: 5,
  numberOfRows: 6,
  currentRow: 0,
  boardState: new Array(6).fill(""),
  boardStyles: new Array(6).fill(""),
  dictionary: AllWordsArray(5),
  targetWord: targetFiveWords[Math.floor(Math.random() * targetFiveWords.length)],
  lettersAndStyling: Letters,
  animation: "",
  alertMessage: { message: "", duration: 1000 },
};

// Helpers

const regexEscape = (someString: string) => {
  return someString.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

const regexUnicode = (whatToSearch: string) => {
  const flags = "u";
  return new RegExp(whatToSearch, flags);
};

const evaluateAlertWinMessage = (row: number) => {
  switch (row) {
    case 0:
      return "Genius";
    case 1:
      return "Magnificent";
    case 2:
      return "Impressive";
    case 3:
      return "Splendid";
    case 4:
      return "Great";

    default:
      return "Phew";
  }
};

// Slice

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame(state) {
      state.gameStatus = "IN_PROGRESS";
      state.numberOfLetters = 5;
      state.numberOfRows = 6;
      state.boardState = new Array(6).fill("");
      state.boardStyles = new Array(6).fill("");
      state.currentRow = 0;
      state.lettersAndStyling = Letters;
      state.targetWord =
        targetFiveWords[Math.floor(Math.random() * targetFiveWords.length)];
      state.alertMessage = { message: "ResetGame", duration: 1000 };
    },
    sixLetterGame(state) {
      state.gameStatus = "IN_PROGRESS";
      state.numberOfLetters = 6;
      state.numberOfRows = 7;
      state.boardState = new Array(7).fill("");
      state.boardStyles = new Array(7).fill("");
      state.currentRow = 0;
      state.lettersAndStyling = Letters;
      state.dictionary = AllWordsArray(6);
      state.targetWord =
        targetSixWords[Math.floor(Math.random() * targetSixWords.length)];
      state.alertMessage = { message: "ResetGame", duration: 1000 };
    },
    sevenLetterGame(state) {
      state.gameStatus = "IN_PROGRESS";
      state.numberOfLetters = 7;
      state.numberOfRows = 8;
      state.boardState = new Array(8).fill("");
      state.boardStyles = new Array(8).fill("");
      state.currentRow = 0;
      state.lettersAndStyling = Letters;
      state.dictionary = AllWordsArray(7);
      state.targetWord =
        targetSevenWords[Math.floor(Math.random() * targetSevenWords.length)];
      state.alertMessage = { message: "ResetGame", duration: 1000 };
    },
    eightLetterGame(state) {
      state.gameStatus = "IN_PROGRESS";
      state.numberOfLetters = 8;
      state.numberOfRows = 9;
      state.boardState = new Array(9).fill("");
      state.boardStyles = new Array(9).fill("");
      state.currentRow = 0;
      state.lettersAndStyling = Letters;
      state.dictionary = AllWordsArray(8);
      state.targetWord =
        targetSevenWords[Math.floor(Math.random() * targetSevenWords.length)];
      state.alertMessage = { message: "ResetGame", duration: 1000 };
    },
    resetAnimation(state) {
      state.animation = "";
      if (state.gameStatus === "animation") {
        state.gameStatus = "IN_PROGRESS";
      }
    },
    resetAlert(state) {
      state.alertMessage = { message: "", duration: 1000 };
    },
    addLetterToCurrentRow(state, action) {
      if (state.currentRow === state.numberOfRows) return;
      if (state.boardState[state.currentRow].length < state.numberOfLetters) {
        state.boardState[state.currentRow] += action.payload;
      }
    },
    backSpaceHandler(state) {
      if (state.currentRow === state.numberOfRows) return;
      if (state.boardState[state.currentRow].length > 0) {
        state.boardState[state.currentRow] = state.boardState[
          state.currentRow
        ].slice(0, -1);
      }
    },
    enterHandler(state) {
      state.gameStatus = "animation";

      const dictionary = AllWordsArray(state.numberOfLetters)

      if (state.boardState[state.currentRow].length === state.numberOfLetters) {
        if (dictionary.includes(state.boardState[state.currentRow])) {
          const styles = new Array(state.numberOfLetters).fill("a");

          // There are two targets so that the targetPresent don't remove possible further
          // correct matches accidently, for example in the word "fluff"
          // that way it's not necessary to iterate another time through the word
          // it's possible to do that in other aways too though

          let targetPresent = regexEscape(state.targetWord);
          let targetCorrect = targetPresent;

          const currentTryWord = state.boardState[state.currentRow];

          for (let index = 0; index < currentTryWord.length; index++) {
            const attemptLetter = currentTryWord[index];
            const regex = regexUnicode(attemptLetter);

            const attemptLetterKey = attemptLetter as LettersObjectKeyType;

            if (attemptLetter === targetCorrect[index]) {
              styles[index] = "c";
              targetCorrect = targetPresent.replace(regex, "!");
              targetPresent = targetCorrect;

              state.lettersAndStyling[attemptLetterKey] = "correct";

              continue;
            }

            if (targetPresent.includes(attemptLetter)) {
              styles[index] = "p";
              targetPresent = targetPresent.replace(regex, "!");

              if (state.lettersAndStyling[attemptLetterKey] === "correct")
                continue;

              state.lettersAndStyling[attemptLetterKey] = "present";

              continue;
            }

            if (
              state.lettersAndStyling[attemptLetterKey] === "correct" ||
              state.lettersAndStyling[attemptLetterKey] === "present"
            )
              continue;

            state.lettersAndStyling[attemptLetterKey] = "abscent";
          }

          state.boardStyles[state.currentRow] = styles.join("");

          if (state.boardStyles[state.currentRow] === "ccccc") {
            state.gameStatus = "WIN";

            state.alertMessage = {
              message: evaluateAlertWinMessage(state.currentRow),
              duration: 3000,
            };

            ++state.currentRow;
            return;
          }
          ++state.currentRow;
          if (state.currentRow === state.numberOfRows) {
            state.gameStatus = "fail";
            state.alertMessage = {
              message: state.targetWord.toUpperCase(),
              duration: 0,
            };
            return;
          }
        } else {
          state.animation = "shake";
          state.alertMessage.message = "Not in word list";
        }
      } else {
        state.animation = "shake";
        state.alertMessage.message = "Not enough letters";
      }
    },
  },
});

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;
