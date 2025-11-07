buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  $("#" + currentColour).addClass("pressed");
}

$(document).keypress(function () {
  if (level === 0) {
    nextSequence();
  }
});

function checkAnswer(indexToCheck) {
  if (userClickedPattern[indexToCheck] === gamePattern[indexToCheck]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    level = 0;
    gamePattern = [];
    setTimeout(function () {
      playSound("wrong");
      $("body").removeClass("game-over");
    }, 200);
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press A Key to Restart");
  }
}
