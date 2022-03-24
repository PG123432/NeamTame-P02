const c = document.getElementById("playground");        //gets playground element
var ctx = c.getContext("2d");                           //gives context
const start = document.getElementById("startGame");     //gets start game button
const scoreBoard = document.getElementById("score");    //gets score button
const timer = document.getElementById("timer");
let lastHole;                                           //the last hole(prevents repeats)
let timeUp = false;                                     //checks if time is up
let score = 0;                                          //score of the user
var requestID;

let gameOver = new Image(80, 80);
gameOver.src = "game_over.png";


let moleDuration, moleDurationTimer, stopwatch, countdown, then;                         //moleduration(ms): how long the mole stays on the screen


let setanimate = (e) =>{                                                                  
  startTime = Date.now();
  then = startTime;                                 
  moleDuration = 500;
  stopwatch = 0;
}


let animate = (e) => {
  timer.textContent = Math.floor(countdown/1000);
  if (countdown <= 500){
    clear();
    window.cancelAnimationFrame(requestID);
    timer.textContent = "Game Over";
  }
  else{

    window.cancelAnimationFrame(requestID);
    now = Date.now();
    stopwatch = now - startTime;
    countdown = 60000 - stopwatch;
    moleDurationTimer = Date.now() - then;

    console.log(countdown);


    /*if (moleSpawnTimer > moleperiod){
      moleSpawnTimer =  moleSpawnTimer % moleperiod;
      hole = randomHole(holeObj);
      x = hole.xcord;
      y = hole.ycord;
    } */

    if (moleDurationTimer < moleDuration){
      clear();
      moleSpawn(x,y);
    }
    else{
      moleDurationTimer = moleDurationTimer % moleDuration;
      then = Date.now();
      hole = randomHole(holeObj);
      x = hole.xcord;
      y = hole.ycord;
    }
  }



  

  

  requestID = window.requestAnimationFrame(animate);
}



var clear = (e) => {
  console.log("clear invoked...")
  ctx.clearRect(0, 0, c.width, c.height);
  // YOUR CODE HERE
};
let x, y;

let moleButton = document.getElementById("spawnMole");


let moleSpawn = (x,y) => {
    moleTimer = 0;
    ctx.drawImage(mole, x, y, mole.width, mole.height);
    ctx.rotate(Math.PI / 2);
};

var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};
















// var mole = new Image(50, 50);
// mole.src = "first_mole.jpeg";
var mole = new Image(80, 80);
mole.src = "/static/js/diglett.png";

// image dimensions (can be found in mainpage.html canvas)
const x_max = 900
const y_max = 692

// ADJUSTABLE   [offset, left_x, left_y]
let first_mole = [50, 170, 6]   // for size 50
let diglett = [85, 155, 50]     // for size 80
let chosen_mole = diglett
const offset = chosen_mole[0]
const left_x = chosen_mole[1]
const left_y = chosen_mole[2]

// right coords
const right_x = x_max - left_x - offset
const right_y = y_max - left_y - offset

// middle coords
const middle_x = (left_x + right_x) / 2
const middle_y = (left_y + right_y) / 2

// leave here for debugging
// SOLELY FOR DEBUGGING (USELESS OTHERWISE)
let holeObj2 = [
  {"name": "hole1", "xcord": left_x, "ycord": left_y},
  {"name": "hole2", "xcord": middle_x, "ycord": middle_y},
  {"name": "hole3", "xcord": right_x, "ycord": right_y}
]

let holeObj = [
  {"name": "hole1", "xcord": left_x, "ycord": left_y},
  {"name": "hole2", "xcord": left_x, "ycord": middle_y},
  {"name": "hole3", "xcord": left_x, "ycord": right_y},

  {"name": "hole4", "xcord": middle_x, "ycord": left_y},
  {"name": "hole5", "xcord": middle_x, "ycord": middle_y},
  {"name": "hole6", "xcord": middle_x, "ycord": right_y},

  {"name": "hole7", "xcord": right_x, "ycord": left_y},
  {"name": "hole8", "xcord": right_x, "ycord": middle_y},
  {"name": "hole9", "xcord": right_x, "ycord": right_y},
]


function randomTime(min, max) {                         //function for random time
    return Math.round(Math.random() * (max - min) + min);
}


function randomHole(holes){                             //function for random hole
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}


function startGame() {                                //starts the game, resets stats
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  // attempting to draw the holes

  setTimeout(() => timeUp = true, 10000)
  setanimate();
  animate();
}

function whack() {                                   //adds score if clicked
  score++;
  scoreBoard.textContent = score;
  console.log("whacked!")
}



var canvasX, canvasY;

c.addEventListener("mousemove", function(e) { 
    var cRect = c.getBoundingClientRect();        // Gets CSS pos, and width/height
    canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    console.log("tracking mouse");
});

c.addEventListener( "click", function(e){
    console.log("             mole (x, y): (" + x + ", " + y + ")" )
    console.log("mouse (canvasX, canvasY): (" + canvasX + ", " + canvasY + ")" )
    if(Math.abs(canvasX-(x+25)) < 50 && Math.abs(canvasY-(y+25)) < 50){
      whack();
    }
});
start.addEventListener( "click", startGame);


// //Fix for scoring within canvas
// $('#molePic').on( "click", function(e){
//   {
//     alert(
//       "finally bruv"
//     )
//     whack()
//   }
// })
