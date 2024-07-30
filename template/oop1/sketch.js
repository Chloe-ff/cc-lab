let taxi1;
let taxi2;

let honk1;
let honk2;
let ambience;

function preload(){
    honk1 = loadSound("assets/honk1.mp3");
    honk2 = loadSound("assets/honk1.mp3");
    ambience = loadSound("assets/ambience.map3");
}

function mousePressed(){
    honk1.play();
    ambience.loop();
}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("p5-canvas-parent")
    //in set up
    taxi1 = new Taxi(100, 150, 0.8);
    console.log(taxi1);

    taxi2 = new Taxi(300, 300, 1.5);
}
  
function draw() {
    background(100, 100, 150);

    //call in the draw
    //should be before display()
    taxi1.update();
    taxi1.display();

    taxi2.update();
    taxi2.display();

}

//inside the class, call this. everytime, no matter function or property
//outside the class, no need to call
class Taxi{
    constructor(startX, startY, scaleFactor){
        //this.x = random(width);
        //this.y = random(height);
        this.x = startX;
        this.y = startY;
        this.s = scaleFactor;
        this.wheelAngle = 45;
        this.wheelSpeed = 2;
        this.speed = random(-2, 2);
    }

    maybeHonk(){
        if (random(0, 100) < 0.5){
            if (random() < 0.5){
                honk1.play();
            }else{
                honk2.play();
            }
            
        }
    }

    update(){
        //remember to call "this."
        this.spinWheel();
        this.move();
        this.maybeHonk();
    }

    spinWheel(){
        this.wheelAngle += this.wheelSpeed;
    }

    move(){
        this.x += this.speed;

        if (this.x > width){
            this.x = 0;
        }

        if (this.x < 0){
            this.x = width;
        }
    }

    display(){
        push();
        translate(this.x, this.y);
        scale(this.s);

            noStroke();
            fill(240, 220, 60);

            // base:
            rect(-50, -50, 100, 30);
            // top"
            rect(-25, -70, 50, 20);
            // wheel 1:
            this.drawWheel(-30, -15);
            // wheel 2:
            this.drawWheel( 30, -15);


            // just to see origin 
            // of translation matrix:
            fill("red");
            circle(0, 0, 5); 


        pop();        
    }

    drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        rotate(radians(this.wheelAngle));
  
            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);
  
        pop();
    }

}