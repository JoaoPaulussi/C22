const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, cannonBall;
var balls = [];
var barcos = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  var options = {
    isStatic: true,

  }
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower)
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
  barcos = new Barco(width - 79, height - 60, 170, 170, -80);
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  //rectMode(CENTER);
  //rect(tower.position.x,tower.position.y,160,310);
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();
  cannon.display();
  for (i = 0; i < balls.length; i++) {
    showCannonBall(balls[i], i);
  }
  showBarcos();
}

function showCannonBall(ball, i) {
  if (ball) {
    ball.show();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall)
  }
}
function keyReleased() {
  if (keyCode === 32) {
    balls[balls.length - 1].shoot();
  }
}
function showBarcos() {
  if (barcos.length > 0) {
    if (
      barcos[barcos.length - 1] === undefined || barcos[barcos.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var barco = new Barco(width, height - 100, 170, 170, position);
      barcos.push(barco);
    }
    for (var i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        Matter.Body.setVelocity(barcos[i].body, {
          x: -0.9,
          y: 0,
        })
        barcos[i].display();
      }
    }
  }
  else {
    var barco = new Barco(width, height - 60, 170, 170, -60);
    barcos.push(barco);
  }
}