var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {

  //create variable for empty array
  var cardArray = [];

  //write a loop that goes through 1-8
  for (var cardNumber = 1; cardNumber <= 8; cardNumber++) {
    //push the values from 1-8 into the array twice. Just repeat
    cardArray.push(cardNumber);
    cardArray.push(cardNumber);
  }

  //create new array to house the values in
  var cardNumbers=[];

  //Run the loop until the sequentially-ordered array is empty
  while (cardArray.length > 0) {
    //generates random index of the array and matches length of pervious array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var randomIndex = Math.floor(Math.random() * cardArray.length);
    //uses splice to remove element at random index https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    var randomValue = cardArray.splice(randomIndex, 1)[0];
    //return the randomized array back to the new card array
    cardNumbers.push(randomValue);
  }
  //display new array
  return cardNumbers;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
