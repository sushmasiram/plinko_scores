var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];

var particle=[];
var scoreAdded=[];
var turn = 5;

var divisionHeight=300;
var score =0;

var gameState= "play";

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


  for (var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  if(particle.length){
    for (var i =0;i<particle.length;i++){

      
      particle[i].display();
     
      if(particle[i].body.position.y > 760 && !scoreAdded[i]){
        scoreAdded[i] = true
          if(particle[i].body.position.x < 300 && particle[i].body.position.x > 0){
            score= score + 500;
          }else if(particle[i].body.position.x > 301 && particle[i].body.position.x < 600){
            score = score + 100
          }else if(particle[i].body.position.x > 601 && particle[i].body.position.x < 900){
            score = score + 200
          }
          
          //give frame delay
          if(particle.length>4){            
            gameState= "end";        
          }
      }
    } 
        
    }

    if(gameState === "end"){
      push()
      textSize(30)
      text("Game Over!", width/2-100, height/2)
      textSize(15)
      text("Press Space to restart the game", width/2-100, height/2+50)
    }
    
  }

//if x is less than 300 - 500, x btw 301 and 600 100, x between 601 and 900 200 points

function mousePressed(){

  if(gameState != "end"){
   
   particle.push(new Particle(mouseX, 10, 10, 10));
   scoreAdded.push(false)
  }
}

function  keyPressed(){
  if (keyCode === 32){

    for (var i =0; i <particle.length;i=i+1){
      World.remove(world,particle[i].body)
    }
    // alternative code to remove all the particles from world.
    //particle.map(i => {World.remove(world,i.body)})
    gameState = "play"
    particle=[];
    scoreAdded = [];
  }
}
