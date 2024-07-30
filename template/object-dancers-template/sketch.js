/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ChloeDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ChloeDancer {
  constructor(startX, startY) {
    this.xI = startX; //initial x
    this.x = startX;
    this.xC = 1; //change of x-axis
    this.yI = startY; //initial y
    this.y = startY;
    this.yC = 2; //change of y-axis
    this.d = 100; //diameter
    this.r = 5; //rotation angle
    this.speed = 1;
    this.speedY = 1; //speed of vertical motion
    this.wingR = 5; //rotation of the wings   
    this.leg = 30; //length of the legs
    this.legY = 55; //y-axis position of leg;
    this.creatureR = 0; //rotation of the creature
    this.creatureRC = 0.4; //angle change of the creature
    this.rolling = 0; //creature rolling
    this.count = 0; //bouncing
    this.high = this.yI-200; // the highest position during boucing
    //this.bounceH = [this.yI - 200, this.yI - 120, this.yI - 40]; //another try about line 53

    this.highest = false; //whether reaches the highest position during bouncing
    this.back = false; //whether need to go back
    this.up = true; //go up during boucing
    this.down = false; //go down during bouncing
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.moveWing();
    this.rotateCreature();
    this.moveCreature();

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    if (this.back == true){
      this.roll();
    }

    if (this.back == false){
      rotate(radians(this.creatureR));
      //left wing
      noStroke();
      fill(200, 0, 200, 200);
      rotate(radians(20 + this.wingR));
      ellipse(- 60, 0, 55, 30);
      ellipse(- 50, 18, 45, 25);
      ellipse(- 40, 35, 35, 20);
      //right wing
      rotate(radians(-40 - this.wingR*2));
      ellipse(60, 0, 55, 30);
      ellipse(50, 18, 45, 25);
      ellipse(40, 35, 35, 20);
    }  
    //body
    if (this.back == false){
      rotate(radians(20 + this.wingR));
    }
    noStroke();
    fill("pink");
    circle(0, 0, this.d);
    //legs
    if (this.back == false){
      fill("violet");
      ellipse(- 20, this.legY, 20, this.leg);
      ellipse(+ 20, this.legY, 20, this.leg);
    }
    //face
    noFill();
    stroke("red");
    strokeWeight(2);
    if (this.back == true){
      ellipse(0, 25, 15, 10);
    }else{
      curve(-25, -20, -15, 15, 15, 15, 25, -20);
    }
    noStroke();
    fill(0);
    circle(-20, -15, 10);
    circle(20, -15, 10);


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    pop();
  }

  moveWing(){
    this.wingR = -this.wingR;
  }

  rotateCreature(){
    if (this.creatureR >= 10 || this.creatureR <= -10){
      this.creatureRC = -this.creatureRC;
    }
    this.creatureR += this.creatureRC;
  }

  moveCreature(){
    //hironzaontally
    if (this.back == false && this.x <= this.xI + 100){
      this.x += this.xC;
    }

    if (this.back == true){
      if (this.x >= this.xI){
        this.x -= this.xC;
      }else{
        this.back = false;
      }  
    }

    
    //vertically
    if (this.y > this.high){
      this.speedY = -this.speedY*2;
      this.count += 1;
    }else if (this.y < this.yI){
      this.speedY = -this.speedY/2;
      //this.count += 1;
      this.high += 50;
    }
    
    if(this.count < 4){
      this.y -= this.speedY;
    }else{
      this.back = true;
    }
  }

  //   if (this.highest == false && this.back == false){
  //     if (this.y >= this.yI - 150){
  //       this.y -= this.yC;
  //     }else{
  //       this.highest = true;
  //     }
  //   }
  //   if (this.highest == true){
  //     if (this.y <= this.yI){
  //       this.y += this.yC*5;
  //     }else{
  //       this.bounce();
  //       this.highest = false;
  //     }   
  //   }

  // }

  // bounce(){
  //   if (this.count < 2) {
  //     this.count += 1;
  //     this.high += 50;
  //     if (this.y >= this.high && this.up == true) {
  //       this.y -= this.yC * 2;
  //     } else {
  //       this.up = false;
  //       this.down = true;
  //     }
  //     if (this.y <= this.yI && this.down == true) {
  //       this.y += this.yC * 10;
  //     } else {
  //       this.up = true;
  //       this.down = false;
  //     }
  //   }else{
  //     this.back = true;
  //     this.count = 0;
  //   }

  //   for (let i = 0; i < 3; i ++){
  //     if (this.y >= this.bounceH[i] && this.up == true) {
  //       this.y -= this.yC * 2;
  //     } else {
  //       this.up = false;
  //       this.down = true;
  //     }
  //     if (this.y <= this.yI && this.down == true) {
  //       this.y += this.yC * 10;
  //     } else {
  //       this.up = true;
  //       this.down = false;
  //     }
  //     this.back = true;
  //   }
  // }

  roll(){
    if (this.back == true){
      rotate(radians(this.rolling));
      this.rolling += 2;
    }
  }

}


//move faster, and when falling, let the wings move faster (bc falling is faster)



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/