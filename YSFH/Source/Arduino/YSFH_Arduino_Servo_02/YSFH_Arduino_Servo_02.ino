//########################################
//  Servo Program for Arduino
//  Keio University Westlab 2012.11

//  Sets servo angle according to data received.
//########################################

#include <Servo.h> 

Servo myservo;
int data;

void setup(){
  myservo.attach(9);
  Serial.begin(9600);
}

void loop(){
  //***** When Data Received *****
  if (Serial.available() > 0) {
    data = Serial.read();
    data = data / 255.0 * 180.0;
    //** set servo angle **
    myservo.write(data);
  }
}
