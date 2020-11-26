var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var particle;
var turn = 5;

var divisionHeight=300;
var score =0;

var gameState= play;
var end= 0;
var play= 1;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

   for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

   for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

   for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

   for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }
}
 
function draw() {
  background("black");

  textSize(20)
  text("Score : "+score,20,30);

  Engine.update(engine);

  //line(0, 500, 800, 500);
  
  fill("white");
  text("500", 25, 550);
  text("500", 100, 550);
  text("500", 180, 550);
  text("500", 260, 550);

  text("100", 340, 550);
  text("100", 420, 550);

  text("200", 500, 550);
  text("200", 580, 550);
  text("200", 660, 550);
  text("200", 740, 550);

  for (var i = 0; i < plinkos.length; i++){
    plinkos[i].display();
  }

  /*if(frameCount%60===0){
    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  }
 
  for (var j = 0; j < particles.length; j++){
    particles[j].display();
  }*/

  for (var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  if(particle!=null){
   //mousePressed();
   particle.display();
    
    if(particle.body.position.y > 760){
      if(particle.body.position.x < 300){
        score= score+500;
        particle=null;
         if(turn>=5){
          gameState= "end";
        }
      }
    }
  }
}

function mousePressed(){
  //console.log("pressed")
  if(gameState != "end"){
   turn++;
   //console.log(turn)
   particle= new Particle(mouseX, 10, 10, 10);
  }
}