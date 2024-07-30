// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 20; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
  colorMode(HSB);

  //generate particles
  // for (let i = 0; i < NUM_OF_PARTICLES; i++) {
  //   particles[i] = new Particle(random(width), random(height));
  // }
}

function draw() {
  //background(sky and ground);
  background(30,  75, 25);
  noStroke();
  fill(210, 25, 75);
  rect(0, 0, width, height/1.2); 

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.checkOnCanvas();
    p.display();
  }

  for (let i = 0; i < particles.length; i++){
    if (particles[i].onCanvas == false || particles[i].clean == true){
      particles.splice(i, 1);
    }
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.yI = startY;
    this.dia = 30;
    this.colorHue = random(30, 150);
    this.leaveWidth = random(10, 25);
    this.leaveHeight = this.leaveWidth - 5;
    this.onCanvas = true;
    this.windY = random(1, 5);
    this.clean = false;
  }
  // methods (functions): particle's behaviors
  update() {

    if (keyIsPressed == true){
      if (key == "l"){
        this.y -= this.windY;
        this.x -= 5;
      }
      if (key == "r"){
        this.y -= this.windY;
        this.x += 5;
      }
    }else if (this.y < this.yI){
      this.y += 2;
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    noStroke();
    fill(this.colorHue, 50, 50);
    ellipse(0, 0, this.leaveWidth, this.leaveHeight);

    pop();
  }

  checkOnCanvas(){
    if (this.x > width || this.x < 0 || this.y < 0){
        this.onCanvas = false;
    }
  }

  checkClick(){
    let distanceToMouse  = dist(mouseX, mouseY, this.x, this.y);
    if(distanceToMouse < this.leaveHeight/2){
        this.clean = true;
    }     
  }
}

function mousePressed(){
  for(let i = 0; i < particles.length; i++){
    particles[i].checkClick();
  }
}

function keyPressed(){
  if (key == 'f'){
    for (let i = 0; i < NUM_OF_PARTICLES; i ++){
      particles.push(new Particle(mouseX+i*10, height/1.2));
  }
  }
}