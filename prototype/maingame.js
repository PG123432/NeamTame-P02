const c = document.getElementById("playground");        //gets playground element
var ctx = c.getContext("2d");                           //gives context
const start = document.getElementById("startGame");     //gets start game button
const scoreBoard = document.getElementById("score");    //gets score button
let lastHole;                                           //the last hole(prevents repeats)
let timeUp = false;                                     //checks if time is up
let score = 0;                                          //score of the user

var mole = new Image(50, 50)

let holes = [
{ 
  "name": "hole1",
  "xcord": 125,
  "ycord": 250
},
{
  "name": "hole2",
  "xcord": 250,
  "ycord": 250
},
{
  "name": "hole3",
  "xcord": 375,
  "ycord": 250
}

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

function peep() {                                       //function to make the mole peep
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    console.log(hole.name)
    setTimeout(() => {                                  //keeps going, sets new time
      if (!timeUp) peep();
    }, time);
    ctx.beginPath();
    ctx.drawImage(mole, hole.xcord, hole.ycord, mole.width, mole.length);
  }

  function startGame() {                                //starts the game, resets stats
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

  function whack() {                                    //adds score if clicked
    score++;
    scoreBoard.textContent = score;
    console.log("whacked!")
  }

  
c.addEventListener( "click", whack);
start.addEventListener( "click", startGame);

