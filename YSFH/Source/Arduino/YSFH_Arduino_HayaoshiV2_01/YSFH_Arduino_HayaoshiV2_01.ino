//########################################
//  Hayaoshi Program for Arduino
//  Keio University Westlab 2012.11

//  Sends signal when button is pressed.
//  If 1st Place, LED = On
//########################################

//***** Your Name Here *****
String name = "Your Name";

const int buttonPin = 2;
const int LED_Red = 5;
const int LED_Green = 6;
int flag = 0;
int data;

void setup(){
  //***** Initialize IO Ports *****
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(LED_Red, OUTPUT);
  pinMode(LED_Green, OUTPUT);
  //***** Start Serial *****
  Serial.begin(9600);

}

void loop(){
  //***** If not sent and button pressed *****
  if(digitalRead(buttonPin)==LOW && flag == 0){ 
    Serial.println(name);
    flag = 1;  
  }
  //***** If sent and button released *****
  if(digitalRead(buttonPin)==HIGH && flag == 1){ 
    flag = 0;  
  }
  
  //***** If Data Received *****
  if (Serial.available() > 0) {
    data = Serial.read();
    
    //** If 1st Place **   
    if(data == 1){
      digitalWrite(LED_Green, HIGH);
    }
    
    //** If Reset Command **
    if(data == 0){
      digitalWrite(LED_Green, LOW);
    }
  }
}
