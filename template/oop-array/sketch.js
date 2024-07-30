let cow1;
let cowIMG;

let cows = [];
let numCows = 20;

function preload(){
    cowIMG = loadImage("assets/cow-poster.png");
}

function setup() {
    let cnv = createCanvas(1000, 1000);
    cnv.parent("p5-canvas-parent");
    //cow1 = new Cow(300, 200, cowIMG);

    for (let i = 0; i < numCows; i ++){
        let oneCow = new Cow(random(width), random(height), cowIMG);
        cows.push(oneCow);
    }
}
  
function draw() {
    background(0, 200, 120);

    //cow1.display();
    //cow1.update();

    for (let i = 0; i < cows.length; i ++){
        cows[i].display();
        cows[i].update();
    }
    
}

class Cow{
    constructor(startX, startY, cowimg){
        this.x = startX;
        this.y = startY;
        this.photo = cowimg;
        this.scaleFactor = random(0.4, 0.5);

        this.xSpeed = 1;
        this.ySpeed = 1;
    }
    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > width){
            this.x = 0;
        }
        if (this.y > height){
            this.y = 0;
        }
    }

    display(){
        push();
        translate(this.x, this.y);
        scale(this.scaleFactor);

        //noStroke();
        //fill(255);
        //rect(0, 0, 50, 50);
        let imgW = this.photo.width;
        let imgH = this.photo.height;
        image(this.photo, -imgW/2, -imgH+90);
        //console.log(this.x);

        pop();
    }
}