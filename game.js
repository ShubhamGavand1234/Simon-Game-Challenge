var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence() {
  userClickedPattern = [];

  $("h1").text("Level " + level);

  var num = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[num];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  level++;
}

// $(".btn").click(function () {
//   var userChosenColour = $(this).attr("id");
//   console.log(userChosenColour);
//   userClickedPattern.push(userChosenColour);
// });

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
var started = false;

$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  console.log(userClickedPattern + " " + gamePattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success ");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $(document).on("keypress", startOver());
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
