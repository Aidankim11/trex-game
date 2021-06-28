var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score=0
var gamestate="play"
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexstop=loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obi1=loadImage("obstacle1.png")
  obi2=loadImage("obstacle2.png")
  obi3=loadImage("obstacle3.png")
  obi4=loadImage("obstacle4.png")
  obi5=loadImage("obstacle5.png")
  obi6=loadImage("obstacle6.png")
  overImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  jumps=loadSound("jump.mp3")
  dies=loadSound("die.mp3")
  checkpoints=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200)
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop", trexstop);
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);
  ground2 = createSprite(300,190,600,20);
  ground2.visible=false
  obig=createGroup()
  cloudg=createGroup()
  Over=createSprite(300,100,50,20)
  restart=createSprite(300,130,50,20)
  Over.addImage(overImg)
  restart.addImage(restartImg)
  Over.scale=0.5
  restart.scale=0.4
}

function draw() {
  background(244);
  if(gamestate==="play"){
    ground.velocityX = -(4+score/100);
    if (keyDown("space")&& trex.y>156) {
    trex.velocityY = -12;
      jumps.play()
  }
      if(score%100===0&&score>0){
        checkpoints.play()
      }
    sky()
  obis()
  trex.velocityY = trex.velocityY + 0.8
    score=score+Math.round(getFrameRate()/60)
    if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    if(trex.isTouching(obig)){
      gamestate="end"
      dies.play()
    }
    Over.visible=false
    restart.visible=false
  }
  if(gamestate==="end"){
    ground.velocityX=0
    cloudg.setVelocityXEach(0)
    obig.setVelocityXEach(0)
    cloudg.setLifetimeEach(-3)
    obig.setLifetimeEach(-3)
    Over.visible=true
    restart.visible=true
    trex.velocityY=0
    trex.changeAnimation("stop", trexstop);
    if(mousePressedOver(restart)){
      score=0
      gamestate="play"
      cloudg.destroyEach()
      obig.destroyEach()
      trex.changeAnimation("running", trex_running)
    }
  }
  trex.debug=false
  trex.setCollider("rectangle",0,0,80,80)
  //jump when the space button is pressed
  fill("blue")
  text("Score: "+score,500,30)
  trex.collide(ground2);

  drawSprites();
}
function sky(){
  if(frameCount%60===0){
    
  
  cloud=createSprite(600,random(30,100),50,30)
  cloud.velocityX=-4
    cloud.addImage(cloudimg)
    cloud.scale=0.2
    trex.depth=cloud.depth+1
    cloud.lifetime=180
    cloudg.add(cloud)
  }
}
function obis(){
  if(frameCount%80===0){
    obi=createSprite(600,160,10,10)
    obi.velocityX=-(4+score/100)
    option=Math.round(random(1,6))
    console.log(option)
    switch(option){
      case 1:obi.addImage(obi1)
        obi.scale=0.1
        break
        case 2:obi.addImage(obi2)
        obi.scale=0.1
        break
        case 3:obi.addImage(obi3)
        obi.scale=0.15
        break
        case 4:obi.addImage(obi4)
        obi.scale=0.05
        break
        case 5:obi.addImage(obi5)
        obi.scale=0.05
        break
        case 6:obi.addImage(obi6)
        obi.scale=0.1
        break
    }
        obi.lifetime=160
        obig.add(obi)
  }
}