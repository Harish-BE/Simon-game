var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
var buttonColor=["red","blue","green","yellow"];

$("html").on("keydown",function(){
  if(!started){
    $("h1").text("level "+level);
    start_game();
    started=true;
  }
});

$(".btn").on("click",function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColor);
  animatePress(userChosenColor);

});
//check answer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){

    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        start_game();
      },1000);
    }
  }else{

    var wrong_audio=new Audio("sounds/wrong.mp3");
    wrong_audio.play();
    $("body").addClass("game_over");
    setTimeout(function(){
      $("body").removeClass("game_over");
    },200);
    $("h1").text("Game Over, Press any key to restart");
    start_over();
  }
}

//to restart the game
function start_over(){
  level=0;
  gamePattern=[];
  started=false;
}

//to start a game when the user clicks
function start_game() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


//play sound of the user pressed button
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//animation when a button is pressed
function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
  $("#"+currentColor).removeClass("pressed");
}, 100);
}
