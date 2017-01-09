//store all functions into a single self invoking function
(function(){ /* code */

//when page loads show game start screen along with start game button and player name inputs
$('body').append('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');
hideAll();

var winners = [ //store all wining combiations
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '4', '8'],
  ['1', '4', '7'],
  ['2', '4', '6'],
  ['0', '3', '6'],
  ['2', '5', '8'],
];

var playerOne = []; //store all move of playerOne
var playerTwo = []; //store all move of playerTwo
var moveCounter = 0;  //store number of moves made


$('body').append('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>'); //append the start screen

$('.button').on('click', function(){  //when the user clicks start game button

  hideAll(); //hide all pages
  $('#board').show(); //show game board
  $('.box').css('background-image', 'none');  //clear background images
  $('#player1').addClass('active'); //set player one to active
});

//when player mouses over a square
$('.box').on('mouseenter', function(){

  if($(this).hasClass('filled') == false){  //if square isn't checked
    if($('#player1').hasClass('active') == true){ //if player one if active
      $(this).css('background-image', 'url("img/o.svg")');    //add background image o
    } else {                                      //if player two is active
      $(this).css('background-image', 'url("img/x.svg")');    //add background image x
    };
  };
});



$('.box').on('mouseout', function(){ //when player mouse leaves a square
  if($(this).hasClass('filled') == false){    //and square was not checked
    $(this).css('background-image', 'none');      //remove background image from that square
  };
});

$('.box').on('click', function(){     //when user clicks on square


  if($('#player1').hasClass('active') == true && $(this).hasClass('filled') == false){     //if player one is active
    $(this).addClass('box-filled-1 filled');    //add class filled-1
    turnControl('#player1', '#player2');    //switch turn from player one to player Two
    playerOne += ($('.box').index(this));   //add square index into playerOne move list
    moveCounter += 1;     //add 1 to move counter
  } else if($(this).hasClass('filled') == false){          //if player 2 is active
    $(this).addClass('box-filled-2 filled');       //add class box-filled-2
    turnControl('#player2', '#player1');        //switch turn from, player two to player one
    playerTwo += ($('.box').index(this));       //add square index into playerTwo move list
    moveCounter += 1;         //add 1 to move counter
  };

  gameOver()      //check if game is over
});

function gameOver(){

  for (var i = 0; i < winners.length; i++){     //cycle through each winning combination
      var winner1 = winners[i][0];      //store winning location 1
      var winner2 = winners[i][1];      //store winning location 2
      var winner3 = winners[i][2];      //store winning location 3
      if($.inArray(winner1, playerOne) !== -1 && $.inArray(winner2, playerOne) !== -1 && $.inArray(winner3, playerOne) !== -1 ){    //if playerOne move list contains winning moves 1, 2 & 3
        hideAll();        //hide game board
        clear();          //clear all move records and game board
        finish('one')     //display winner screen, winner 1
        $('p.message').replaceWith('<p class="message">Winner</p>')    //display display winner
      } else if ($.inArray(winner1, playerTwo) !== -1 && $.inArray(winner2, playerTwo) !== -1 && $.inArray(winner3, playerTwo) !== -1 ){
        hideAll();        //hide game board
        clear();          //clear all move records and game board
        finish('two')     //display winner screen, winner 2
        $('p.message').replaceWith('<p class="message">Winner</p>')    //display display winner
      } else if (moveCounter >= 10) {
        hideAll();      //hide game board
        clear();        //clear all move records and game board
        finish('tie')   //display winner screen, its a tie
        $('p.message').replaceWith('<p class="message">It\'s a Tie</p>')    //display its a tie
     }
    }
};


function turnControl(playerOne, playerTwo){
  $(playerOne).removeClass('active');  //use to change active player
  $(playerTwo).addClass('active');    //use to change active player
}


//function to hide all elements
function hideAll(){
  $('#board').hide();
  $('#start').hide();
  $('#finish').hide();
}


//function to update the winning screen correctly
function finish(winner){
  $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
  $('#finish').addClass('screen-win-'+winner+'');
  $('#finish').show();
}


//function to clear all previous game data for new game to start
function clear(){
  playerOne = [];
  playerTwo = [];
  moveCounter = 0;
  $(".boxes li").parent().find('li').removeClass("box-filled-1 box-filled-2 filled");
}


}())
