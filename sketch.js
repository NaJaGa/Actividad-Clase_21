  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, jumpgoshtimg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  jumpgoshtimg = loadAnimation("ghost-jumping.png")
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost", ghostImg);
  ghost.addAnimation("jump", jumpgoshtimg);
}


function draw() {
  background(255);
  console.log(ghost.x);
 if(tower.y > 600 ){
      tower.y = 300
    } 
  
  if (gameState === "play") {
    ghost.changeAnimation("ghost",ghostImg);
    if(keyDown("left")){
        ghost.x = ghost.x - 3;

      //escribir el código para mover al fantasma a la izquierda al presionar la flecha izquierda listo
    }
    if(keyDown("right")){
  
          ghost.x = ghost.x + 3;

      //escribir el código para mover el fantasma a la derecha al presionar la flecha derecha listo
      
    }
    if(keyDown("Up")){
  
         ghost.velocityY = -10;
         ghost.changeImage("jump",jumpgoshtimg);

      //escribir el código para mover el fantasma hacia arriba al presionar la flecha arriba listo
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  //^Gravedad
  
   
      //escribir una condición para desplazar infinitamente la torre
    
      spawnDoors();

  
//escribir el código para hacer que invisibleBlockGroup colisione con el fantasma y cambiar gamestate a end.
     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.velocityY = 0
      gameState = "end"
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fin del juego", 230,250)

  }
}

function spawnDoors()
 {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var randnum = Math.round(random(135,475));
    var door = createSprite(randnum, -50);
    var climber = createSprite(randnum,10);
    var invisibleBlock = createSprite(randnum,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    

    //agregar la función random
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //cambiar la profundidad del fantasma y de la puerta
    
     
ghost.depth = door.depth+1;

    
    //asignar lifetime a door, climber y invisible block

 door.lifetime = 800;
   climber .lifetime = 800;
    invisibleBlock.lifetime = 800;
    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle); aquí los obstáculos son door, climber, invisible block
    
     doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

