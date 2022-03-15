const c = document.getElementById("playground");
var ctx = c.getContext("2d");
const start = document.getElementById("startGame");
const scoreBoard = document.getElementById("score");
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    setTimeout(() => {
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

  function whack() { 
    score++;
    scoreBoard.textContent = score;
  }

c.addEventListener( "click", wack);
start.addEventListener( "click", startGame);