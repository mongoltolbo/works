//Global
int frame = 0;

PImage img;

void setup() {
  size(640, 960);
  smooth();
  colorMode(HSB, 100);
  frameRate(60);
}

void draw() {

  background(#1E98B9);
  //Center Line
  stroke(#ffffff);
  strokeWeight(3);
  line(0, height/2 + 50, width, height/2 + 150);
  img = loadImage("icon.png");
  
  //Center btn
  noStroke();
  //fill(#6BBED5);
  //ellipse(width/2, height/2, 300, 300);
  
  

  frame++;
  if (frame > 100) frame = 0;
  fill(frame, 60, 100);
  ellipse(width/2, height/2 + 100, 150,150);
  println(frame);
  if(mousePressed){
   fill(#ffffff);
   ellipse(width/2, height/2 + 100, 150,150);
   background(#ffffff,20);
  }
  fill(#1E98B9);
  ellipse(width/2, height/2 + 100, 140,140);
  fill(#ffffff);
  ellipse(width/2, height/2 + 100, 130,130);

  
  //fill(#E06A3B);
  //ellipse(width/2, height/2, 20, 20);
  image(img, width/2 - 20, height/2 -20 + 100, 40, 40);
  
  
  textSize(33);
  text("Get LATEST infomation", 100, height/3);
  text("AROUND YOU", 340, height/3 + 50);

}



