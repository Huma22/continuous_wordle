Wordle is a simple game in which you have to guess a five-letter word. You get six guesses,
learning a little more information with each guess, and eventually narrow your guesses down to
find the answer. 

In this implimentation of wordle the user has the option to play the game with upto 8 letter words and the user will get n+1 number of guess where n is the number of letters in the word


## How to Play

<img width="501" alt="Screenshot 2023-04-30 at 10 44 09 PM" src="https://user-images.githubusercontent.com/61100995/235394218-acc8f669-d7b8-4dce-a28c-e668e58d3cfe.png">



## Getting Started

To run the development server:

- Download project folder
- cd to the project folder using the terminal or vim
- Run the followiing commands
  * npm install 
  * npm run dev

(OR)

- git clone link_of_project
- cd practice-wordle
- npm install
- npm run dev

The game should be running on http://localhost:3000. 



## Tradeoffs

- Using the array-of-english-words to build the targetWords and Dictionary is not the lead to the best time complexity and is not as configurible as using a set list or a database but the reason I wanted to use this so that the list would be populated with 100 random target words everytime and the dictionary contains all the n-letter words and finding a certain would would be O(n) time complexity 

- Using *.module.css format for certain places that required animation or use of different variables since tailwindcss did not work with this, I made the adjustment and wrote .css files for places that I needed to do so.

- In gameslice.jsx the function for changing the number of letters in the current game is not dynamic but rather has different functions that are being called on each button press, this is not the most efficient method to do this since it would require more work if we decide to add more letter modes to the game in the future

- For creating the board I am currently using different css files that get called when the button for n letter word gets clicked which changes the board layout, this is not the most efficient but I had to do this since with tailwindcss grid-template-columns: repeat(), which is required for creating the board was not working properly with a variable input 





