var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// detecting a keypress to start the game

$(document).keypress(function() {
  if(!started){
    // changing h1 by selecting the id
    $("#level-title").text("Level " + level);
    // calling nextSequence()
    nextSequence();
    started = true;
  }
});


// Check which button was pressed
$(".btn").click(handelClick);
function handelClick() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // call checkAnswer()
  checkAnswer(userClickedPattern.length-1);
}

// create the function checkAnswer()
function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if(userClickedPattern.length === gamePattern.length){
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  } else{
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to Restart.");

    // call startOver() to restart the game
    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  // update the Level
  level++;
  // update h1
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random()*3 + 1);
  var randomChosenColour = buttonColours[randomNum];
  // adding the randomChosenColour to gamePattern
  gamePattern.push(randomChosenColour);

  /*select the button with the same id as the randomChosenColour
  and animate a flash to this button */
  $("#"+randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

  // play the sound for the selected button color
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

// check the User's answer against the game sequence



function playSound(name) {
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

// adding animation to the pressed button
function animatePress(currentColour) {
  $("."+currentColour).addClass("pressed");
  setTimeout ( function(){
    $("."+currentColour).removeClass("pressed");
  }, 100);
}
