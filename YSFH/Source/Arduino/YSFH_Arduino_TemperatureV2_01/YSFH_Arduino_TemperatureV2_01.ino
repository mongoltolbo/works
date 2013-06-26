//########################################
//  Temperature Program for Arduino
//  Keio University Westlab 2012.11

//  Sends temperature data every 10 seconds.
//########################################

#define SERIESRESISTOR 10000

double temperature;
char s[100];
//***** Your Name Here *****
String name = "Your Name";

void setup(){
  Serial.begin(9600);
}

void loop(){
  //***** Get Temperature *****
  temperature = getTemperature(0);
  
  //***** double to string *****
  dtostrf(temperature, 2, 1, s);
  
  //***** Send Temperature *****
  Serial.print(s);
  
  //***** Send Name *****
  Serial.println(name);
  
  //***** Wait 10 Seconds*****
  delay(10000);
}  

//***** Measure Temperature *****
double getTemperature(int pin) {
  int v = 1023 - analogRead(pin);
  double res = (1023.0/v)-1;
  res = SERIESRESISTOR / res;
  double temp = (1/(0.00096564 +(0.00021068 * log(res) ) +(0.000000085826*( pow( log(res) ,3)))))-273.15;
  return temp;
}
