let xRandom = [];
let yRandom = [];
let dia = [];
let Dia = [];
let core = [];
let planetColor = [];
let planetAngle = [];

let sinInput = 0;
let cx = 50;
let planetC;
let up = 0;
let down = 0;

let radarAngle = 90;
let angleChange = 1;
let angle = 0;
let signalX = 700;
let mode = false;

let back = false;

let start = false;
let dead = false;
let horror = false;
let showHorror = 0;

let fortune;

let change = 1;
let showWarning = true;

let jiggle = false;

let high = false;
let medium = false;
let low = false;

let wait = false;
let waitColor = 20;
let waitWarn = 255;

let wander = true;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
  
  frameRate(30);
  for (let i = 0; i < 6; i++) {
    xRandom[i] = random(i * 100 + 50, i * 100 + 100);
    yRandom[i] = random(i * 80 + 40, i * 80 + 100);
    dia[i] = random(10, 40);
    Dia[i] = random(80, 110);
    core[i] = random(1);
    planetColor[i] = random(1);
    planetAngle[i] = random(4);
  }

  //whether xxXxx can live with human beings on the earth
  fortune = random(1);

}


function draw() {
  background(0);

  //monitoring screen
  monitorScreen();
  
  //warning
  warning();
  
  //random stars
  randomStars();

  //planets(with different sizes, colors, and central decorations)
  planets();

  //planets jiggle when being pressed
  Jiggle(showHorror);

  //earth
  noStroke();
  fill("lightblue");
  circle(800, 250, 200);

  //basic motion of the creatures
  let sinValue = sin(sinInput);
  sinInput = sinInput + 0.05;
  let cy = map(sinValue, -1, 1, -30, 30);  
  


  //vertical motions of the creatures
  verticalMotion();

  //generating creatures
  creatures(cy);
  
  let cY = 250 + cy + up + down;
  noStroke();
  
  //horizontal motion of the creatures
  horizontalMotion(cY);

  //radar rotation
  radar(cy, cY);

  //signal(yellow curves)
  yellowCurves();
  
  //signal(orange ball)
  orangeBall(cY);

  //signal(Interaction)
  signal();

}


//--------------new functions--------------


function mousePressed() {
  //press the start button or wait button
  if (227 <= mouseX && mouseX <= 347 && 320 <= mouseY && mouseY <= 350) {
    start = true;
    wait = false;
  }
  if (467 <= mouseX && mouseX <= 587 && 320 <= mouseY && mouseY <= 350) {
    wait = true;
  }
}

function moreCreature(cx, cy) {
  //randomly making the creatures
  let craftX = int(random(1, 5));
  let craftY = int(random(2, 6));
  let craftC1 = int(random(50, 220));
  let craftC2 = random(2);

  //the upper "wing"
  noStroke();
  for (let i = 0; i <= craftX; i++) {
    if (craftC2 >= 1) {
      fill("green");
    } else {
      fill(craftC1, craftC1 - 50, craftC1 + 30);
    }

    ellipse(50 - i * 7 + cx, 250 - i * 7 + cy, 10, 5);
  }
  //the lower "wing"
  for (let j = 0; j <= craftY; j++) {
    if (craftC2 >= 1) {
      fill("green");
    } else {
      fill(craftC1, craftC1 - 50, craftC1 + 30);
    }
    ellipse(50 - j * 7 + cx, 250 + j * 7 + cy, 10, 5);
  }
}

//warning
function warning() {
  if (start == false) {
    fill(150 + change, 220);
    change++;
    if (change >= 70) {
      change -= 5;
    }
    if (change <= -90) {
      change += 5;
    }
    rect(190, 120, 420, 260);
    fill("yellow");
    rect(308, 145, 200, 40);
    fill("red");
    textSize(30);
    text("WARNING!!!", 320, 175);
    fill(255);
    textSize(20);
    text("A creature named xxXxx is approaching!!!", 203, 230);
    text("Please response AS SOON AS POSSIBLE!", 209, 285);
    fill("orange");
    rect(213, 320, 120, 30);
    fill(0);
    textSize(25);
    text("START", 236, 345);
    fill("orange");
    rect(467, 320, 120, 30);
    fill(0);
    textSize(25);
    text("WAIT", 495, 345);

    if (wait == true) {
      fill(waitWarn, 0, 0, 70);
      if (waitWarn <= 150 || waitWarn >= 255) {
        waitColor = -waitColor;
      }
      waitWarn += waitColor;

      rect(0, 0, 800, 500);
    }
  }
}

function signal() {
  if (mouseIsPressed && mouseY <= 150 && start == true) {
    for (let dia = 10; dia <= 30; dia += 5) {
      high = true;
      noStroke();
      //fill(77, 150, 29, 30);
      fill("orange");
      circle(mouseX, mouseY, dia);
    }
  }

  if (mouseIsPressed && mouseY > 350 && start == true) {
    for (let dia = 10; dia <= 30; dia += 5) {
      low = true;
      noStroke();
      //fill(40, 255, 200, 30);
      fill("purple");
      circle(mouseX, mouseY, dia);
    }
  }

  if (mouseIsPressed && (150 < mouseY || mouseY <= 350) && start == true) {
    for (let dia = 10; dia <= 30; dia += 5) {
      medium = true;
      noStroke();
      fill(255, 10, 10, 30);
      circle(mouseX, mouseY, dia);
    }
    if (cx > 0 && cx < 700) {
      back = true;
    }
  }
}

function planets() {
  noStroke();
  for (let i = 0; i <= 5; i++) {
    for (let j = dia[i]; j < Dia[i]; j += 10) {
      if (j >= 45) {
        if (planetColor[i] < 0.5) {
          fill(255, 215, 0, 20);
        } else {
          fill(77, 150, 29, 20);
        }
        circle(xRandom[i], yRandom[i], j);
      } else {
        fill(255, 30);
        circle(xRandom[i], yRandom[i], j);

        //randomly rotate the planets (inspired by Tiancheng Xie's Mini Project 4)
        push();
        translate(xRandom[i], yRandom[i]);
        if (planetAngle[i] < 1) {
          rotate(0);
        } else if (1 <= angle < 2) {
          rotate(PI / 2);
        } else if (2 <= angle < 3) {
          rotate(PI);
        } else if (3 <= angle < 4) {
          rotate((3 * PI) / 2);
        }

        //generate random "cores" of the planets
        if (core[i] < 0.3) {
          fill("red");
          rect(-7, -7, 14, 14);
        }
        if (core[i] >= 0.7) {
          fill("yellow");
          triangle(-5, 5, 0, -6, 5, 5);
        }
        if (0.3 <= core[i] < 0.5) {
          fill(255);
          circle(0, 0, 10);
        }
        pop();
      }
    }
  }
}

function randomStars() {
  fill(random(50, 255));
  for (k = 0; k <= 50; k++) {
    circle(random(width), random(height), random(1, 5));
  }
}

function Jiggle(showHorror) {
  if (mouseIsPressed) {
    for (let i = 0; i <= 5; i++) {
      let x = xRandom[i];
      let y = yRandom[i];
      let distToPlanet = dist(x, y, mouseX, mouseY);
      if (distToPlanet <= Dia[i] / 2) {
        xRandom[i] += random(-1, 1);
        yRandom[i] += random(-1, 1);
        horror = true;
        showHorror = 1;
      }
    }
  }
  if (showHorror == 0){
    horror = false;
  }
}

function monitorScreen() {
  stroke(255);
  strokeWeight(3);
  line(25, 25, 120, 25);
  line(25, 25, 25, 120);
  line(775, 25, 680, 25);
  line(775, 25, 775, 120);
  line(25, 380, 25, 475);
  line(25, 475, 120, 475);
  line(775, 475, 775, 380);
  line(775, 475, 680, 475);
  noStroke();
  fill("red");
  circle(680, 65, 20);
  fill(255);
  textSize(30);
  text("REC", 695, 76);
  textSize(20);
  text("9/12/3046", 550, 73);
}

function yellowCurves() {
  if (mouseIsPressed && start == true) {
    mode = true;
    stroke("yellow");
    strokeWeight(2);
    noFill();
    for (let i = 0; i <= 40; i += 10) {
      curve(
        620 - i * 2,
        230 - i,
        685 - i * 2,
        240 - i,
        685 - i * 2,
        260 + i,
        620 - i * 2,
        270 + i
      );
    }
  }
}

function creatures(cy) {
  //randomly making the creatures
  let craftX = int(random(1, 5));
  let craftY = int(random(2, 6));
  let craftC1 = int(random(50, 220));
  let craftC2 = random(2);

  //the upper "wing"
  noStroke();
  for (let i = 0; i <= craftX; i++) {
    if (mode == true && high == true && horror == false) {
      fill("orange");
    } else {
      if ((mode == true && medium == true) || horror == true) {
        strokeWeight(1);
        stroke(255, 80);
        noFill();
      } else {
        if (craftC2 >= 1) {
          fill("green");
        } else {
          fill(craftC1, craftC1 - 50, craftC1 + 30);
        }
      }
    }
    ellipse(50 - i * 7 + cx, 250 - i * 7 + cy + up + down, 10, 5);
  }
  //the lower "wing"
  for (let j = 0; j <= craftY; j++) {
    if (mode == true && low == true && horror == false) {
      fill("orange");
    } else {
      if ((mode == true && medium == true) || horror == true) {
        stroke(255, 80);
        noFill();
      } else {
        if (craftC2 >= 1) {
          fill("green");
        } else {
          fill(craftC1, craftC1 - 50, craftC1 + 30);
        }
      }
    }
    ellipse(50 - j * 7 + cx, 250 + j * 7 + cy + up + down, 10, 5);
  }
}

function verticalMotion() {
  if (mode == true && horror == false) {
    if (high == true) {
      up -= 1;
    }
    if (low == true) {
      down += 1;
    }
  }
}

function radar(cy, cY) {
  push();
  translate(800, 250);
  rotate(radians(radarAngle));

  let rectLength = 65 + sin(angle) * 40;
  let circleY = rectLength + 20;
  angle += 0.03;

  fill("gray");
  rect(-10, 30, 20, rectLength);
  fill("darkgray");
  arc(0, circleY+5, 50, 50, -7/6*PI-0.2, 1/3*PI-0.2);
  //circle(0, circleY, 50);
  //fill("black");
  //circle(0, circleY + 30, 50);
  //the orange ball(will be signal later)
  if (mode == true && signalX >= cx) {
    fill("black");
  } else {
    fill("orange");
  }
  circle(0, circleY + 13, 10);
  textSize(25);
  text("🦹‍", -17, circleY);
  if (dead == true) {
    stroke("red");
    strokeWeight(3);
    line(17, circleY - 15, -16, circleY);
    line(17, circleY, -16, circleY - 15);
  }

  pop();

  if (radarAngle >= 180 || radarAngle < 0) {
    angleChange = -angleChange;
  }
  radarAngle += angleChange;
}

function orangeBall(cY) {
  if (mode == true && signalX >= cx && start == true) {
    signalX -= 5;
    noStroke();
    fill("orange");
    circle(signalX, cY, 10);
  }
  if (signalX < cx) {
    mode = false;
    back = false;
    high = false;
    medium = false;
    low = false;
    signalX = 700;
  }
}

function horizontalMotion(cY) {
  if (cx <= 700 && back == false && start == true && horror == false) {
    cx += 2;
  }
  if (cx > 700 && (cY > 350 || cY < 150) && back == false) {
    cx += 2;
    if (cx == 900) {
      cx = 50;
    }
    fill("gold");
    circle(800, 250, 200);
  }

  if (cx >= 700 && 150 <= cY && cY <= 350) {
    if (fortune < 0.4) {
      // xxXxx will kill human beings after landing on the earth
      fill("darkred");
      circle(800, 250, 200);
      dead = true;
    } else {
      //xxXxx can live together with human beings
      wander = false;
      moreCreature(750, 0);
      moreCreature(720, -20);
      moreCreature(740, 50);
      moreCreature(745, -40);
    }
  }

  if (back == true && horror == false) {
    if (0 < cx < 700) {
      cx -= 2;
    }
  }
  if (cx == 0 || cx == 700) {
    back = false;
  }
}