const c = document.getElementById("playground");        //gets playground element
var ctx = c.getContext("2d");                           //gives context
const start = document.getElementById("startGame");     //gets start game button
const scoreBoard = document.getElementById("score");    //gets score button
let lastHole;                                           //the last hole(prevents repeats)
let timeUp = false;                                     //checks if time is up
let score = 0;                                          //score of the user
var requestID;








var clear = (e) => {
  console.log("clear invoked...")
  ctx.clearRect(0, 0, c.width, c.height);
  // YOUR CODE HERE
};
let x, y;

let moleButton = document.getElementById("spawnMole");


let setHole = (e) => {
  hole = randomHole(holeObj);
  x = hole.xcord;
  y = hole.ycord;
  window.cancelAnimationFrame(requestID);
  moleSpawn();
}



let moleSpawn = () => {
  console.log("mole Spawned");
  console.log(requestID);
  window.cancelAnimationFrame(requestID);

  clear();
  ctx.beginPath();
  ctx.drawImage(mole, x, y, mole.width, mole.height);
  ctx.rotate(Math.PI / 2);

  if (whack) {
    stopIt();
  }

  requestID = window.requestAnimationFrame(moleSpawn);
};

var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

moleButton.addEventListener("click", setHole);















// var mole = new Image(50, 50);
// mole.src = "first_mole.jpeg";
var mole = new Image(80, 80);
mole.src = "diglett.png";
mole.id = "molePic";
document.body.appendChild(mole);

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

  peep();
  setTimeout(() => timeUp = true, 10000)
}

function whack() {                                    //adds score if clicked
  score++;
  scoreBoard.textContent = score;
  console.log("whacked!")
}

//Fix for scoring within canvas
$('#molePic').on( "click", function(e){
  {
    alert(
      "finally bruv"
    )
    whack()
  }
});
start.addEventListener( "click", startGame);
