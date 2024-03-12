const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, cannonBall;
var balls = [];

function preload(){
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
}

function setup(){
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  var options = {
    isStatic: true,

  }
  ground = Bodies.rectangle(0,height -1,width *2,1,options);
  World.add(world,ground);
  tower = Bodies.rectangle(160,350,160,310,options);
  World.add(world,tower)
  cannon = new Cannon(180,110,130,100,angle);
  cannonBall = new CannonBall(cannon.x,cannon.y);
}

function draw(){
  image(backgroundImg,0,0,1200,600);
  Engine.update(engine);
  rect(ground.position.x,ground.position.y,width*2,1);
  push();
  //rectMode(CENTER);
  //rect(tower.position.x,tower.position.y,160,310);
  imageMode(CENTER);
  image(towerImg,tower.position.x,tower.position.y,160,310);
  pop();
  cannon.display();
  for(i=0;i<balls.length;i++){
    showCannonBall(balls[i],i);
  }
}

function showCannonBall(ball,i){
  if(ball){
    cannonBall.show();
  }
}

function keyPressed(){
  if(keyCode === 32){
    var cannonBall = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall)
  }
}
function keyReleased(){
  if(keyCode === 32){
    balls[balls.length-1].shoot();
  }
}