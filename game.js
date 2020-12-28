let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let started = false
let level = 0

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}

$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level: " + level)
    nextSequence()
    started = true
  }
})

$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  console.log("userClickedPattern"+userClickedPattern);
  checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    startOver()
    $("#level-title").text("Game Over, Press Any Key to Restart")
  }
}

function nextSequence() {
  userClickedPattern = []
  gamePattern = []
  level++
  $("#level-title").text("Level: " + level)
  let randomNumber = generateRandomNumber(0, 3)
  let randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  console.log("gamePattern"+gamePattern)

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");

  audio.muted = false
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed")
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed")
  }, 100)
}
