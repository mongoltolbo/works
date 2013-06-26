//########################################################
//  Servo Program
//  Keio University Westlab 2012.11

//  Broadcasts angle data to all xbees.
//########################################################

int center_x = 300;
int center_y = 300;
int r = 150;
int d2 = 15;
float temp;
int tx;
float theta = 0.0;
float end_x = 0.0;
float end_y = 0.0;
boolean locked = true;
float theta_tmp;

String text1 = "WestLab";
String text2 = "Keio University";

import processing.serial.*;
Serial myPort;  //Serial Class Object

PImage img; 

void setup()
{
  //***** Draw Background *****
  size(600,600);
  
  //***** Opens first available COM port on PC *****
  String portName = Serial.list()[0];
  myPort = new Serial(this, portName, 9600);
  
  //***** Make a new instance of a PImage by loading an image file *****
  img = loadImage("YSFH_Servo2.png");
}

void draw()
{
  update();
  display();
}

void display()
{
  smooth();
  image(img,0,0);
  
  //***** Draw Servo Image *****
  fill(10);
  rect(250, 150, 100, 200);
  fill(40);
  rect(250, 120, 100, 30);
  rect(250, 350, 100, 30);
  fill(255);
  ellipse(300, 135, 15, 15);
  ellipse(300, 365, 15, 15);
  fill(40);
  ellipse(center_x, center_y, 90, 90);
  fill(255);
  strokeWeight(25);
  stroke(200);
  line(center_x, center_y, end_x, end_y);
  fill(255, 100, 100);
  noStroke();
  ellipse(end_x, end_y, d2, d2);
}

void update()
{
  //***** If Unlocked, Update Position *****
  if(locked == false){
    theta_tmp = atan2(mouseY - center_y, mouseX - center_x);
    if((theta_tmp > (-PI/4)) || (theta_tmp < (-PI/4*3))) theta = theta_tmp;
  }
  end_x = cos(theta) *  r + center_x;
  end_y = sin(theta) * r + center_y;
}

void mousePressed()
{
  //***** Unlock Position *****
  locked = false;
}

void mouseReleased()
{
  //***** Lock Position *****
  locked = true;
  
  //***** Calculate Angle *****
  if((theta >= (-PI/4.0)) && (theta <= PI))
  {
    temp = (theta + PI/4.0) / PI * 2.0 / 3.0 * 255.0;
    tx = (int)temp;
  }
  else if((theta  >= -PI) && (theta <= -3.0/4.0*PI))
  {
    temp = (9.0 / 4.0 * PI + theta) / PI * 2.0 / 3.0 * 255.0;
    tx = (int)temp;
  }
  
  //***** Broadcast Data *****
  api_send(tx);  
}

//***** Transmit Angle Data to Xbee *****
void api_send(int tx_id){
  int[] tx_data = {0x7E, 0x00, 0x0F, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFE, 0x01, 0x00, tx};
  for(int n = 0; n < 18; n++){
    myPort.write(tx_data[n]);
  }
  //** Send Checksum **
  myPort.write(0xFF - ((12 + tx) & 0x000000FF));  
}

