let userClickedPattern = [];

let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let level = 0;

let started = false; 

$(document).keydown(function(event){
    if(!started){
        started = true;
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    }
})

$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

function playSound(name){
    let sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColor){
    $(`.${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`.${currentColor}`).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function(){
            $(document.body).removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    } 
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}