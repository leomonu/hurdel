var canvas ;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;


var players, player1, player2, player3, player4;
var hurdle,hurdle1;

var car1Img,car2Img,car3Img,car4Img,trackImg;
var gameOverImg

var flag = 0;

function preload(){
  player1Img = loadImage("images/boy.png");
  player2Img = loadImage("images/boy.png");
  player3Img = loadImage("images/boy.png");

  player4Img = loadImage("images/boy.png");
  trackImg = loadImage("images/tra.jpg");

}




function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game  = new Game();
  game.getState();
  game.start();
  text(mouseX+":"+mouseY,mouseX,mouseY);
  
}

function draw() {
 
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }

  

  
}