var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});


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

MatchGame.renderCards = function(cardNumbers, $game) {
  //unique colors for array
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  //empty contents in the html file section for game http://api.jquery.com/empty/
  $game.empty();

  //jquery object information about when a card is flipped
  $game.data('flippedCards', []);

  //Looping through each value of the cardNumers array
  for (var valueIndex = 0; valueIndex < cardNumbers.length; valueIndex++) {
    var value = cardNumbers[valueIndex];
    var color = colors[value - 1];
    //adding values to data to show if flipped or not or what color
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    //Created a Jquery object for a new card based of htmls class
    var $cardElement = $('<div class="col-xs-3 card"></div>');

    //adding data to each card using data element https://api.jquery.com/data/
    $cardElement.data(data);

    $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};





/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  //if card is flipped return nothing.
  if ($card.data('isFlipped')) {
    return;
  }

  //if card is flipped set background color and color
  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};
