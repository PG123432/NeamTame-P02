


//access canvas and buttons via DOM
var c = document.getElementById("playground"); // GET CANVAS // GET DOT BUTTON
var stopButton = document.getElementById("buttonStop"); // GET STOP BUTTON
let hammerButton = document.getElementById("hammerButton"); 
let warningButton = document.getElementById("buttonWarning"); 

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d"); // YOUR CODE HERE

//set fill color to team color
ctx.fillStyle = "green" // YOUR CODE HERE

var requestID;  //init global var for use with animation frames


//var clear = function(e) {
var clear = (e) => {
  console.log("clear invoked...")
  ctx.clearRect(0, 0, c.width, c.height);
  // YOUR CODE HERE
};


var radius = 0;
var growing = true;



//initialize image
let malletImage = new Image(40, 60);
malletImage.src = 'Mallet.png';

let warningImage = new Image(40, 40);
warningImage.src = 'Warning.png';

//initiate start x,y,dx,dy for image movement
let x, y, dy, ay;

let fps, fpsInterval, startTime, now, then, elapsed,dfps;



let setHammer = (e) => {
  x = Math.floor(Math.random()*(c.width - malletImage.width));
  y = malletImage.height;
  dy = 0;
  warning();
  window.cancelAnimationFrame(requestID);
  hammerFall();
}


let setWarning = (e) => {
  dfps = 0.03;
  fps = 0.5;
  
  then = Date.now();
  startTime = then;

  x = Math.floor(Math.random()*(c.width - warningImage.width));
  y = warningImage.height;
  warning();
}

let warning = () => {
  console.log("warning...")
  console.log(requestID);
  fpsInterval = 1000 / fps;
  fps += dfps;
  
  window.cancelAnimationFrame(requestID);
  clear();
  
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    
    ctx.beginPath();
    ctx.drawImage(warningImage, x, y, warningImage.width, warningImage.height);
  }
  requestID = window.requestAnimationFrame(warning);

};

let hammerFall = () => {
  console.log("hammers falling...");
  console.log(requestID);
  window.cancelAnimationFrame(requestID);
  
 
  ay = .04;
  
  clear();
  ctx.beginPath();
  ctx.drawImage(malletImage, x, y, malletImage.width, malletImage.height);
  ctx.rotate(Math.PI / 2);
 
  if (y > 300) {
    stopIt();
  }
  
  y +=dy;
  dy += ay;

  requestID = window.requestAnimationFrame(hammerFall);
};

//var stopIt = function() {
var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};


stopButton.addEventListener( "click",  stopIt );
hammerButton.addEventListener( "click" , setHammer );
warningButton.addEventListener( "click" , setWarning );
