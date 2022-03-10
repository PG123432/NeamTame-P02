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

