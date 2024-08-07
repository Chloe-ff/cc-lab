let book;

function preload() {
  font = loadFont("resource/Lobster.otf");
  flipSound = loadSound("resource/flip.mp3");
}

function setup() {
    let cnv = createCanvas(1650, 920);
    cnv.parent("p5-canvas-two");
    colorMode(HSB);
    book = new Book(510, 77);
}

function draw() {
    background(33, 13, 83);
    book.display();

    noisyPoint();
}

function noisyPoint(){
    fill(random(50, 250));
    for (k = 0; k <= 1000; k++) {
      circle(random(width), random(height), 0.8);
    }
}

class Book{
    constructor(startX, startY){
        this.x = startX;
        this.y = startY;
        this.width = 700;
        this.height = 840;
        this.threeD = 5;
        this.pageWidth = this.width - 25;
        this.pageHeight = 805;

        this.open = false;
        this.soundPlay = 0;
    }

    display(){
        push();
        translate(this.x, this.y);

        noStroke();
        //cover
        fill(19, 19, 61);
        rect(-5, 0, this.width, this.height);
        rect(5, -65, this.width, this.height);
        triangle(-5, 0, 5, 0, 5, -65);

        //pages
        fill(40, 20, 70);
        quad(5, this.pageHeight - 30, this.pageWidth + 10, this.pageHeight - 30, this.pageWidth + 5, this.pageHeight + 17, 0, this.pageHeight + 17);

        //shadow
        fill(15, 25, 50);
        rect(-5, this.pageHeight + 35 - this.threeD, this.width, this.threeD);
        rect(5, this.pageHeight - 30, this.width, this.threeD);
        quad(5, this.pageHeight - 30, this.threeD + 5, this.pageHeight - 30, -5 + this.threeD, this.pageHeight + 35 - this.threeD, -5, this.pageHeight + 35 - this.threeD);
        rect(5, -65, this.threeD, this.pageHeight + 35);
        rect(-5, 0, this.threeD, this.pageHeight + 35);
        quad(-5, 0, this.threeD - 5, 0, 5 + this.threeD, -65, 5, -65);
        rect(this.width, -65, this.threeD, this.pageHeight + 35);
        rect(5, -65, this.width, this.threeD);
        quad(-5 + this.width, this.pageHeight + 35, this.width, this.pageHeight + 35, this.width, this.pageHeight - 30, this.width - 5, this.pageHeight - 30);

        //title
        fill(0);
        textSize(100);
        textFont(font);
        text("C h i n e s e\nD i a l e c t\nD i c t i o n a r y", 55, 110);
        textSize(40);
        textFont("Courier New");
        text("Voice, Emotion & Memory", 85, 470);
        text("From 2024", 240, 530);

        stroke(0);
        strokeWeight(4);
        line(80, 580, 640, 580);
        
        strokeWeight(3);
        text("Chloe Song", 235, 650);

        noStroke();
        fill(60, 33, 81);
        ellipse(560, 130, 130, 80);
        triangle(505, 160, 515, 165, 495, 175);
        fill(290, 23, 81);
        ellipse(610, 170, 130, 80);
        triangle(655, 205, 665, 200, 675, 215);

        //open
        textSize(25);
        fill(0);
        textFont("Times New Roman");
        text("OPEN >>>>", 555, 760);
        if (this.open == true && this.soundPlay == 0){
            flipSound.play();
            this.soundPlay += 1;
            setTimeout(function(){window.location.href = "content-index.html";}, 500);
        }

        pop();
    }

}

function mousePressed(){
    if (mouseX >= 1065 && mouseX <= 1215 && mouseY >= 818 && mouseY <= 852){
        book.open = true;
    }
}

//背景图案（memory泡泡？）
//移动物件/scroll功能