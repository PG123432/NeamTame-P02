// David Chong, Thomas Yu
// SoftDev pd1
// K32 -- More Moving Parts
// 2022-02-17

// model for HTML5 canvas-based animation


//access canvas and buttons via DOM
var c = document.getElementById("playground"); // GET CANVAS
var dotButton = document.getElementById("buttonCircle"); // GET DOT BUTTON
var stopButton = document.getElementById("buttonStop"); // GET STOP BUTTON
let dvdButton = document.getElementById("buttonDVD");

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
let image = new Image(60, 40);
image.src = 'logo_dvd.jpg';

//initiate start x,y,dx,dy for image movement
let x, y, dx, dy;

let hammerFall = () => {
  console.log("hammers falling...");
  console.log(requestID);
  window.cancelAnimationFrame(requestID);
  x = Math.floor(Math.random()*(c.width - image.width));
  y = c.height - image.height;
 
  dy = -1.2;
  
  clear();
  ctx.beginPath();
  ctx.drawImage(image, x, y, image.width, image.height);
 
  if (y < 1) {
    stopIt();
  }
  
  y +=dy;

  requestID = window.requestAnimationFrame(hammerFall);
};

//var stopIt = function() {
var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};


stopButton.addEventListener( "click",  stopIt );
playButton.addEventListener( "click" , hammerFall);
