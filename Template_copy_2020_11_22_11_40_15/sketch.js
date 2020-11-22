
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0 
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =               loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeycollide = loadImage("sprite_3.png");
  
  bananaImage = loadImage("banana.png");
  
  obstaceImage = loadImage("obstacle.png");
  
  groundimg = loadImage("xyz.jpg");
 
}

function setup() {
  
  createCanvas(700,600);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
   

  ground = createSprite(600,500,0,0);
  ground.scale = 6.30;
  ground.addAnimation("ground", groundimg);  
  
  monkey= createSprite(100,400,0,0);
  monkey.scale = 0.2;
  monkey.addAnimation("monkey", monkey_running);  
  
  invisiGround = createSprite(100,400,6000,7);
  invisiGround.visible = false;
   
  
}

function draw() {
  
  background("skyblue");
   fill("black");
   textSize(15)
  text("SURVIVAL TIME =  "+score, 500,70);
  textSize(15)
  text("BANANAS COLLECTED =  "+ bananaScore,200,70);
  
  
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(9+score*1.5/100);
  
    if(keyWentDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.5
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
      }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
   if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 320;
    monkey.scale = 0.2;
    monkey.changeAnimation("collide", monkeycollide );
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(70);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(35);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  } 
  
  drawSprites();
  
  monkey.collide(invisiGround); 
  
}

function bananas(){
  if (frameCount%90 === 40){
    
    banana = createSprite(620,200, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.149   ;
    banana.velocityX =-(9+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
   
    
  }
} 

function obstacles(){
   if(frameCount%200 === 0){
     
     obstacle = createSprite(900,370,0,0)
     obstacle.addAnimation("obstacle",obstaceImage)
     obstacle.scale = 0.3;
     obstacle.velocityX = (-9);
     obstacle.lifeTime = 220;
     obstacleGroup.add(obstacle);
     obstacle.setCollider("circle", 0, 0, 180);
     
   } 
 } 
