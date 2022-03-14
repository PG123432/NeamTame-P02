const c = document.getElementById("playground");
var ctx = c.getContext("2d");

const start = document.getElementById("startGame");
const scoreBoard = document.getElementById("score");
const moles = document.querySelectorAll('.mole');
let lastHole;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// function randomHole(holes){
//     const index  = Math.floor(Math.random() * holes.length);
//     const hole = holes[index];
//     if (hole === lastHole){
//         return randomHole(holes);
//     }
//     lastHole = hole;
//     return hole;
// }

// function peep() {
//     // const time = randomTime(500, 1000); 
//     // const hole = randomHole(holes); 
//     peep()
// }

function startGame() {
    console.log("restarted game");
    scoreBoard.textContent = 0;
    score = 0;
    // peep();
}

function wack(e){
    score++;
    scoreBoard.textContent = score;
}

// moles.forEach(mole => mole.addEventListener('click', wack));
c.addEventListener( "click", wack);
start.addEventListener( "click", startGame);