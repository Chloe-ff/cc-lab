let mapIMG;
let dictionary;
let distButton;
let font;

function preload() {
    speaker = loadImage("resource/speaker.png");
    mapIMG = loadImage("resource/China-map.gif");
    flipSound = loadSound("resource/flip.mp3");
    noPage = loadSound("resource/nopage.mp3");
    font = loadFont("resource/Lobster.otf");

    soundP = loadSound("Cities/Pingdingshan/story.m4a");
    soundC = loadSound("Cities/Chengdu/story.m4a");
    soundG = loadSound("Cities/Guangzhou/story.mp3");
    soundK = loadSound("Cities/Kunming/story.m4a");
    soundL = loadSound("Cities/Lanzhou/story.m4a");
    soundZ = loadSound("Cities/Zhoushan/story.mp3");

    imageP = loadImage("Cities/Pingdingshan/image.jpg");
    imageC = loadImage("Cities/Chengdu/eggcake.jpg");
    imageL = loadImage("Cities/Lanzhou/image.jpg");
    imageG = loadImage("Cities/Guangzhou/img.jpg");
    imageK = loadImage("Cities/Kunming/image.jpg");
    imageZ = loadImage("Cities/Zhoushan/image.jpg")

    Nihao = loadImage("words/nihao.jpg");
    Wo = loadImage("words/wo.jpg");
    Xiexie = loadImage("words/xiexie.png");
    Zaijian = loadImage("words/zaijian.png");
    Chifan = loadImage("words/chifan.jpg");
    Shuijiao = loadImage("words/shuijiao.jpg");

    chifanL = loadSound("Cities/Lanzhou/chifan.m4a");
    nihaoL = loadSound("Cities/Lanzhou/nihao.m4a");
    shuijiaoL = loadSound("Cities/Lanzhou/shuijiao.m4a");
    woL = loadSound("Cities/Lanzhou/wo.m4a");
    xiexieL = loadSound("Cities/Lanzhou/xiexie.m4a");
    zaijianL = loadSound("Cities/Lanzhou/zaijian.m4a");

    chifanG = loadSound("Cities/Guangzhou/chifan.mp3");
    //nihaoG = loadSound("Cities/Guangzhou/nihao.mp3");
    shuijiaoG = loadSound("Cities/Guangzhou/shuijiao.mp3");
    woG = loadSound("Cities/Guangzhou/wo.mp3");
    //xiexieG = loadSound("Cities/Guangzhou/xiexie.mp3");
    //zaijianG = loadSound("Cities/Guangzhou/zaijian.mp3");

    chifanK = loadSound("Cities/Kunming/chifan.m4a");
    nihaoK = loadSound("Cities/Kunming/nihao.m4a");
    shuijiaoK = loadSound("Cities/Kunming/shuijiao.m4a");
    woK = loadSound("Cities/Kunming/wo.m4a");
    xiexieK = loadSound("Cities/Kunming/xiexie.m4a");
    zaijianK = loadSound("Cities/Kunming/zaijian.m4a");

    chifanP = loadSound("Cities/Pingdingshan/chifan.m4a");
    nihaoP = loadSound("Cities/Pingdingshan/nihao.m4a");
    shuijiaoP = loadSound("Cities/Pingdingshan/shuijiao.m4a");
    woP = loadSound("Cities/Pingdingshan/wo.m4a");
    xiexieP = loadSound("Cities/Pingdingshan/xiexie.m4a");
    zaijianP = loadSound("Cities/Pingdingshan/zaijian.m4a");

    chifanZ = loadSound("Cities/Zhoushan/chifan.mp3");
    nihaoZ = loadSound("Cities/Zhoushan/nihao.mp3");
    shuijiaoZ = loadSound("Cities/Zhoushan/shuijiao.mp3");
    woZ = loadSound("Cities/Zhoushan/wo.mp3");
    xiexieZ = loadSound("Cities/Zhoushan/xiexie.mp3");
    zaijianZ = loadSound("Cities/Zhoushan/zaijian.mp3");

    chifanC = loadSound("Cities/Chengdu/chifan.m4a");
    nihaoC = loadSound("Cities/Chengdu/nihao.m4a");
    shuijiaoC = loadSound("Cities/Chengdu/shuijiao.m4a");
    woC = loadSound("Cities/Chengdu/wo.m4a");
    xiexieC = loadSound("Cities/Chengdu/xiexie.m4a");
    zaijianC = loadSound("Cities/Chengdu/zaijian.m4a");

}

function setup() {
    let cnv = createCanvas(1650, 950);
    cnv.parent("p5-canvas-one");
    colorMode(HSB);
    dictionary = new Dictionary(135, 55);
}

function draw() {
    background(33, 13, 83);
    dictionary.display();
    dictionary.update();
}

class Dictionary {
    constructor(startX, startY) {
        this.x = startX;
        // this.xI = startX;
        this.y = startY;
        // this.yI = startY;
        this.width = 1400;
        this.height = 840;
        this.threeD = 5;
        this.pageWidth = this.width / 2 - 57;
        this.pageHeight = 805;

        this.lineX = this.x + 28;
        this.lineY = this.y + 30;
        this.lineHeight = 770;

        this.nextPage = false;
        this.prevPage = false;
        this.leftPage = false;
        this.rightPage = false;
        this.flipPlay = 0;
        this.pageNum = 0;
        this.no = false;


        this.cities = ["Zhoushan", "Guangzhou", "Kunming", "Chengdu", "Pingdingshan", "Lanzhou"]; //, "Wenzhou", "Suzhou" (第二位)
        this.cityX = [692, 608, 495, 510, 612, 505]; //, 673, 680
        this.cityY = [497, 595, 560, 487, 450, 420]; //, 529, 480
        this.images = [imageZ, imageG, imageK, imageC, imageP, imageL]; //, 0, 0
        this.sounds = [soundZ, soundG, soundK, soundC, soundP, soundL]; //, 0, 0
        this.storiesPlay = 0;
        this.index = 0;
        this.bigmap = false;
        this.show = false;
        this.showName = "";

        this.speakerX = [1920, 1920, 2400, 2400, 2400, 2400]; //, 1920, 1920
        this.speakerY = [640, 1540, 640, 940, 1240, 1540]; //, 940, 1240
        this.wordPlay = 0;
        this.playword = false;
        this.word = false;
        this.wordcount = 0;
        this.words = [this.Zhoushan, this.Guangzhou, this.Kunming, this.Chengdu, this.Pingdingshan, this.Lanzhou]; //, this.Wenzhou, this.Suzhou  
        this.Pingdingshan = [woP, nihaoP, xiexieP, zaijianP, chifanP, shuijiaoP]; //a series of words
        this.Lanzhou = [woL, nihaoL, xiexieL, zaijianL, chifanL, shuijiaoL];
        this.Guangzhou = [woG, woG, woG, woG, chifanG, shuijiaoG]; //之后改一下！
        this.Zhoushan = [woZ, nihaoZ, xiexieZ, zaijianZ, chifanZ, shuijiaoZ];
        this.Kunming = [woK, nihaoK, xiexieK, zaijianK, chifanK, shuijiaoK];
        this.Chengdu = [woC, nihaoC, xiexieC, zaijianC, chifanC, shuijiaoC];

        this.storyP = "My hometown has a special\nmutton soup. It is very delicious.\nYou are welcome to taste it!"
        this.storyK = "Cangshan and Erhai make people drunk. Dali's Shengpi is crisp and fragrant. The Rushan made by my mother smells like milk."
        this.storyC = "Danhonggao is one kind of Chengdu traditional snack foods. My favorite flavor is creamy meat floss."
        this.storyL = "Lanzhou specialties are the\nThirty-two bridges on the Yellow River and very delicious beef noodles."
        //this.storyS = "Mung bean soup"
        this.storyG = "Char siu"
        //this.storyW = "Yiwu High School"
        this.storyZ = "Taohua Island used to be dominated by fishing. Every time the fishing boat came back, it was very busy. Hairtail, pampus, yellow croakeer, inkfish, crab and shrimp are very fresh, making you want to drool."

        this.stories = [this.storyZ, this.storyG, this.storyK, this.storyC, this.storyP, this.storyL]; //, this.storyW, this.storyS

        // this.intro = true;
        // this.memory = false;
        // this.dictionary = false;

        // this.turn1X = this.width / 2 + 2 + this.pageWidth;
        // this.turn1Y = -20;
        // this.turn2X = this.width / 2 + 2 + this.pageWidth;
        // this.turn2Y = -20 + this.pageHeight;
    }

    update() {
        this.lines();
        this.button();
        //this.map();
        if (this.pageNum == 0){
            this.intro();
        }

        if (this.pageNum == 1){
            this.bigMap();
        }

        if (this.pageNum == 2){
            this.wo();
        }

        if (this.pageNum == 3){
            this.nihao();
        }

        if (this.pageNum == 4){
            this.xiexie();
        }

        if (this.pageNum == 5){
            this.zaijian();
        }

        if(this.pageNum == 6){
            this.chifan();
        }

        if(this.pageNum == 7){
            this.shuijiao();
        }

        this.turnPage();
    }

    intro(){
        this.word = false;
        if (this.storiesPlay == 2){
            this.sounds[this.index].pause();
        }
        this.bigmap = false;
        this.show = false;
        this.showName = "";
        fill(55, 60, 70);
        textFont("Impact");
        textSize(40);
        text("Introduction", 415, 130);
        textFont("Courier New");
        textSize(25);
        fill(0);
        text("Hi, my dear friend. Hope everyting\ngoes well.\n\nI'm Chloe from 21st century, a very\nlong time ago. I think you probably\nnever imagined life back then. You\nmay also know nothing about Chinese\nDialects.\n\nIf so, this dictionary will give you\na surprise. Given to the possibility\nof forgetting, I collected seven\nChinese Dialects and wrote this\ndictionary in 2024.\n\nHere, you can know the interesting\npronunciations of different Chinese\nDialects. You can also hear some\nstories of the native speakers.", 250, 180);
        text("Their voices, memories and emotions\nhave withstood the test of time and,\nin a sense, constitute eternity.\n\nIf insterested, feel free to open\nthis old dictionary and have a\nwonderful tour!\n\nBest,\nChloe🥹", 900, 180);

    }

    bigMap(){
        this.word = false;
        this.bigmap = true;
        this.map();
        fill(55, 60, 70);
        textFont("Impact");
        textSize(38);
        text("Getting Familiar with These Cities", 895, 130);
        fill(0)
        textFont("Courier New");
        textSize(25);
        text("This dictionary collects seven kinds\nof Chinese dialects. They come from\nseven cities. Each of the city is\nrepresented by a red dot on the left\nmap.\n\nBefore turning to the dictionary\nsection, feel free to click these red\ndots and get familiar with the\ncorresponding cities. You will hear\nthe memory and emotions of the natives.", 870, 190);
        
        if (this.show == true){
            noStroke();
            fill(0, 100, 50);
            circle(this.cityX[this.index], this.cityY[this.index], 10);
            fill(0);
            textFont(font);
            text(this.showName, 870, 550);
            scale(0.2);
            image(this.images[this.index], 4350, 2850);
            scale(5);
            if (this.storiesPlay == 1){
                //this.sounds[this.index].currentTime = 0;
                this.sounds[this.index].play();
                this.storiesPlay = 2;
            }

            textFont("Courier New");
            textSize(18);
            text(this.stories[this.index], 1080, 590);
        }

    }

    showword(){
        noStroke();
        if (this.playword == true){
            fill(0, 100, 50);
            circle(this.cityX[this.index], this.cityY[this.index], 10);
            console.log(this.playword);
        }
    }

    wo(){
        this.word = true;
        if (this.storiesPlay == 2){
            this.sounds[this.index].pause();
        }
        this.bigmap = false;
        this.show = false;
        this.showName = "";
        this.map();
        scale(0.7);
        image(Wo, 1370, 166);
        scale(10/7);
        fill(55, 60, 70);
        textFont(font);
        textSize(100);
        text("Me", 1200, 230);
        textFont("Courier New");
        this.icon();
        this.showword();
    }
//"", "", "", "", "", "Pingdingshan"
    nihao(){
        this.map();
        image(Nihao, 890, 130);
        fill(55, 60, 70);
        textFont(font);
        textSize(100);
        text("Hello", 1200, 230);
        textFont("Courier New");
        this.icon();
        this.showword();
    }

    xiexie(){
        this.map();
        scale(0.3);
        image(Xiexie, 3050, 460);
        scale(10/3);
        fill(55, 60, 70);
        textFont(font);
        textSize(100);
        text("Thanks", 1150, 230);
        textFont("Courier New");
        this.icon();   
        this.showword();     
    }

    zaijian(){
        this.map();
        scale(0.3);
        image(Zaijian, 3150, 490);
        scale(10/3);
        fill(55, 60, 70);
        textFont(font);
        textSize(100);
        text("Bye", 1230, 230);
        textFont("Courier New");
        this.icon();
        this.showword();
    }

    chifan(){
        this.map();
        scale(0.07);
        image(Chifan, 13000, 1800);
        scale(100/7);
        fill(55, 60, 70);
        textFont(font);
        textSize(60);
        text("have a meal", 1180, 220);
        textFont("Courier New");
        this.icon();
        this.showword();
    }

    shuijiao(){
        this.map();
        scale(0.07);
        image(Shuijiao, 13000, 1800);
        scale(100/7);
        fill(55, 60, 70);
        textFont(font);
        textSize(100);
        text("Sleep", 1200, 230);
        textFont("Courier New");
        this.icon();
        this.showword();
    }

    icon(){
        textSize(50);
        fill(0);
        scale(0.5);
        image(speaker, 1770, 560);
        text("Zhoushan", 2050, 650);

        image(speaker, 1770, 860);
        text("Guangzhou", 2050, 950);

        image(speaker, 1770, 1160);
        text("Kunming", 2050, 1250);

        image(speaker, 1770, 1460);
        text("Chengdu", 2050, 1550);

        image(speaker, 2250, 560);
        text("Pingdingshan", 2530, 650);

        image(speaker, 2250, 860);
        text("Lanzhou", 2530, 950);

        //image(speaker, 2250, 1160);
        //text("Pingdingshan", 2530, 1250); wenzhou

        //image(speaker, 2250, 1460);
        //text("Lanzhou", 2530, 1550); suzhou

        scale(2);
    }
    
    map() {
        scale(0.6);
        image(mapIMG, this.pageWidth / 2 - 370, 200);
        scale(5 / 3);
        for (let i = 0; i < 6; i++) { //8
            let cityX = this.cityX[i];
            let cityY = this.cityY[i];
            fill("gray");
            circle(cityX, cityY, 10);
        }
    }


    display() {
        push();
        translate(this.x, this.y);
        noStroke();

        //the brown outline
        fill(19, 19, 61);
        rect(0, 0, this.width, this.height);
        fill(15, 25, 50);
        quad(
            -this.threeD,
            +this.threeD,
            -this.threeD,
            +this.height - this.threeD,
            0,
            +this.height,
            0,
            0
        );
        quad(
            +this.width,
            0,
            +this.width + this.threeD,
            +this.threeD,
            +this.width + this.threeD,
            +this.height - this.threeD,
            +this.width,
            +this.height
        );
        rect(0, +this.height - this.threeD, this.width, this.threeD);
        arc(+this.width / 2, +this.height - this.threeD, 100, 40, 0, PI);
        stroke(50, 75, 50);
        strokeWeight(3);
        noFill();
        //curve(+this.width/2-60, +this.height+80, +this.width/2-50, +this.height-15, +this.width/2+50, +this.height-15, +this.width/2+60, +this.height+80);
        //lines at middle
        stroke(25);
        strokeWeight(4);
        line(this.width / 2, -10, this.width / 2, -20 + this.pageHeight);
        stroke(15);
        line(
            this.width / 2,
            -20 + this.pageHeight,
            this.width / 2 - 10,
            this.pageHeight + 10
        );
        line(
            this.width / 2,
            -20 + this.pageHeight,
            this.width / 2 + 10,
            this.pageHeight + 10
        );
        noStroke();
        //left & right shadow
        fill(40, 20, 80);
        quad(25, 20, 25, 10 + this.pageHeight, 55, this.pageHeight - 20, 55, -10);
        quad(
            this.width - 25,
            10 + this.pageHeight,
            this.width - 25,
            20,
            this.width - 55,
            -10,
            this.width - 55,
            this.pageHeight - 20
        );
        //low shadow
        fill(40, 20, 70);
        quad(
            25,
            10 + this.pageHeight,
            55,
            this.pageHeight - 20,
            this.width / 2 - 2,
            -20 + this.pageHeight,
            this.width / 2 - 12,
            this.pageHeight + 10
        );
        quad(
            this.width / 2 + 2,
            -20 + this.pageHeight,
            this.width / 2 + 12,
            this.pageHeight + 10,
            this.width - 25,
            10 + this.pageHeight,
            this.width - 55,
            this.pageHeight - 20
        );
        //pages
        fill(40, 10, 90);
        rect(55, -10, this.pageWidth, this.pageHeight - 10);
        rect(this.width / 2 + 2, -10, this.pageWidth, this.pageHeight - 10);

        //stroke(40, 10, 90);
        //curve(20, 20+this.pageHeight, 55, 10+this.pageHeight, this.width/2, this.height-25, this.width/2+30, this.height);

        pop();
    }

    turnPage() {

        if (this.no == true) {
            noPage.play();
            this.no = false;
            setTimeout(function(){window.location.href = "cover-index.html";}, 1000);
        }

        if (this.nextPage == true) {
            push();
            translate(this.width / 2 + 2 + this.x, this.y - 10);

            let xs = map(mouseX, this.x + 55 + 2 * this.pageWidth, 55 + this.x, 1, -1);
            if (xs > -1 && xs < 1) {
                scale(xs, 1);
                fill(40, 15, 90);
                rect(0, 0, this.pageWidth - 3, this.pageHeight - 10); //page
            }

            if (xs < 0) {
                this.flipPlay += 1;
                this.leftPage = true;
            }

            // if (this.leftPage == true && xs >0){
            //     this.flipPlay = 1;
            // }

            if (this.flipPlay == 1) {
                flipSound.play();
                this.pageNum += 1; //再斟酌一下下一页内容出现的时机
            }

            pop();

            if (xs < -1) {
                //flipSound.play();
                this.nextPage = false;
                this.flipPlay = 0;
            }
        }

        if (this.prevPage == true) {
            push();
            translate(this.width / 2 + 2 + this.x, this.y - 10);

            let xs = map(mouseX, 55 + this.x, this.x + 55 + 2 * this.pageWidth, -1, 1);
            if (xs > -1 && xs < 1) {
                scale(xs, 1);
                fill(40, 15, 90);
                rect(0, 0, this.pageWidth - 3, this.pageHeight - 10); //page
            }

            if (xs > 0) {
                this.flipPlay += 1;
                // flipSound.play();
            }

            if (this.flipPlay == 1) {
                flipSound.play();
                this.pageNum -= 1;
            }

            pop();

            if (xs > 1) {
                //flipSound.play();
                this.prevPage = false;
                this.flipPlay = 0;
            }
        }
    }

    lines() {
        stroke(25);
        strokeWeight(0.5);
        for (let i = 0; i < 5; i++) {
            line(
                this.lineX + i * 6,
                this.lineY - i * 6,
                this.lineX + i * 6,
                this.lineY - i * 6 + this.lineHeight
            );
            line(
                this.lineX + this.width - 56 - i * 6,
                this.lineY - i * 6,
                this.lineX + this.width - 56 - i * 6,
                this.lineY - i * 6 + this.lineHeight
            );
        }
    }

    button() {
        noStroke();
        fill(20, 35, 60);
        circle(1450, 810, 40);
        circle(220, 810, 40);

        fill(0);
        textSize(15);
        textFont("Times New Roman");
        text("Next", 1436, 815);
        text("Prev.", 206, 815);
    }

}

function mousePressed() {
    let distNext = dist(mouseX, mouseY, 1450, 810);
    let distPrev = dist(mouseX, mouseY, 220, 810);
    if (distNext <= 20) {
        if (dictionary.pageNum < 7) {
            //dictionary.no = false;
            dictionary.nextPage = true;
        } else {
            dictionary.no = true;
        }
    }
    if (distPrev <= 20) {
        if (dictionary.pageNum > 0) {
            //dictionary.no = false;
            dictionary.prevPage = true;
        } else {
            dictionary.no = true;
        }
    }

    if (dictionary.bigmap == true){
        for (let i = 0; i < 6; i++){ //8
            if (dist(mouseX, mouseY, dictionary.cityX[i], dictionary.cityY[i]) <= 5){
                dictionary.show = true;
                dictionary.showName = dictionary.cities[i];
                dictionary.index = i;
                dictionary.storiesPlay = 1;
            }
        }
        //console.log(dictionary.show);
    }

    if (dictionary.word == true){
        for (let i = 0; i < 6; i++){ //8
            if (dist(mouseX, mouseY, dictionary.speakerX[i], dictionary.speakerY[i]) < 75){
                dictionary.index = i;
                dictionary.wordPlay = 1;
                this.playword = true;
            }
        }
    }

}


//how to turn a page while looking smoothly
//每次过中线都有翻页声
//建一个array，通过index实现每页不一样
//重新播放从头开始
//thanks the help of ...