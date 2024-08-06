function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("p5-canvas-parent")
}
  
function draw() {
    background(220, 100, 150);

    fill(10,  200, 100);
    circle(50, 50, 100);
    fill(255);
    text("happy", 50, 50);

}