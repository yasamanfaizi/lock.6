//variable to store different state of game
var gameState = "serve";
var count = 0;

var computerscore = 0;
var playerscore = 0;

function preload(){
  Cimg = loadImage("C.png")
  Himg = loadImage("H.png")
  Aimg = loadImage("A.png")
  Pimg = loadImage("P.png")
  Timg = loadImage("T.png")
  Eimg = loadImage("E.png")
  Rimg = loadImage("R.png")
}

function setup(){
  ball = createSprite(200,200,10,10);
playerPaddle = createSprite(380,200,10,70);
computerPaddle = createSprite(10,200,10,70);
C = createSprite(125,15,5,5);
C.addImage(Cimg);
C.scale = 0.015;
H = createSprite(145,15,5,5);
H.addImage(Himg);
H.scale = 0.015;
A = createSprite(165,15,5,5);
A.addImage(Aimg);
A.scale = 0.015;
P = createSprite(185,15,5,5);
P.addImage(Pimg);
P.scale = 0.015;
T = createSprite(205,15,5,5);
T.addImage(Timg);
T.scale = 0.015;
E = createSprite(225,15,5,5);
E.addImage(Eimg);
E.scale = 0.015;
R = createSprite(245,15,5,5);
R.addImage(Rimg);
R.scale = 0.015;
edges = createEdgeSprites();
}

function draw() {
  //clear the screen
  background("white");
  textSize(15);
  text(computerscore,170,10);
  text(playerscore,230,10);
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",130,180);
  }
  
  if(ball.isTouching(playerPaddle)){
    count = count + 1;
  }
  if(count >= 3){
  C.visible = true;
  } else {
    C.visible = false;
  }
  if(count >= 6){
  H.visible = true;
  } else {
    H.visible = false;
  }
  if(count >= 12){
  A.visible = true;
  } else {
    A.visible = false;
  }
  if(count >= 15){
  P.visible = true;
  } else {
    P.visible = false;
  }
  if(count >= 18){
  T.visible = true;
  } else {
    T.visible = false;
  }
  if(count >= 21){
  E.visible = true;
  } else {
    E.visible = false;
  }
  if(count >= 24){
  R.visible = true;
  } else {
    R.visible = false;
  }
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x>400) {
      computerscore = computerscore+1;
    }
    if(ball.x<0) {
     playerscore = playerscore+1; 
    }
    reset();
    gameState = "serve";
    count = 0;
  }
  
 if (computerscore === 5||playerscore === 5){
   gameState="over";
   text ("Game Over",170,160);
   text ("press R to restart",145,180);
 } 
  if (keyDown("r")&& gameState === "over"){
    computerscore = 0;
    playerscore = 0;
    gameState = "serve";
  }
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}