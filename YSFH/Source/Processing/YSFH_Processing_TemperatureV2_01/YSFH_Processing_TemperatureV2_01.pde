//########################################################
//  Temperature Viewer
//  Keio University Westlab 2012.11

//  Displays temperature, user name, and 64bit address.
//########################################################

int[][] data = new int[50][100];
char[] i = new char[10];
char[] tmptext = new char[100];
int[] k = new int[100];
int[] idchk = new int[50];
int[] addrtmp = new int[8];

String text1 = "WestLab";
String text2 = "Keio University";

int tmp, cnt, p;
int id = 0;
int idcnt = 0;
int b = 0;
int flen = 0;
float place = 0.0;

import processing.serial.*;

PFont font1, font2, font3;
PImage img; 

Serial myPort;  //Serial Class Object

void setup() 
{
  //***** Create Window *****
  size(1000, 680);

  //***** Opens first available COM port on PC *****
  String portName = Serial.list()[0];
  myPort = new Serial(this, portName, 9600);
  
  //***** Load Fonts *****    
  font1 = createFont("Eras Demi ITC",32,true);
  font2 = createFont("Arial",18,true);
  font3 = createFont("7barSPBd",18,true);

  //***** Make a new instance of a PImage by loading an image file *****
  img = loadImage("tmp_bg.jpg");
}

void draw()
{
  //########## Initial Setup ##########
  //***** Print Text *****
  fill(255);
  textFont(font1);        
  textAlign(RIGHT);
  text(text1,980,665);  
  textFont(font2);
  text(text2,830,665);  
  textAlign(LEFT);

  //***** Draw Background Image *****
  image(img,0,0);
 
  //########## Serial Data Read ##########
  while ( myPort.available() > 0) {  // If data is available,
    tmp = myPort.read();
    if((tmp == 0x7E) && (cnt > 14)){
      cnt = 0;    //reset counter;
    }
    
    //***** Read Frame Length *****
    if ( cnt == 2 ){
      flen = tmp;
    }
    
    //***** Read 64bit Address and Select ID *****
    if (4 <= cnt && cnt <= 11){
      addrtmp[cnt-4] = tmp;
      //** Check Existing Entries **
      for(int a = 0; a <= idcnt; a++){
        if(tmp != data[a][cnt-4]){
          idchk[a]++;  
        }
      }
      //** Check If New Entry **
      if (cnt == 11){
        /* Increment b Until Matching Entry */
        for(b = 0; b <= idcnt; b++){
          if(idchk[b] == 0){
            break;
          }
        }
        /* Reset idchk */
        for(int d = 0; d <= idcnt; d++){
          idchk[d] = 0;
        }
        /* Check if New ID */
        if(b-1 == idcnt){
          id = b-1;
          idcnt++;
          for(int c = 0; c < 8; c++){
            data[id][c] = addrtmp[c];
          }
        }
        /* If not New ID */
        else{
          id = b;
        }
      }
    }
 
    //***** Read Temperature Data *****
    k[cnt] = tmp;    //For Displaying RAW Data
    if (15 <= cnt && cnt <= 18){
      i[cnt-15] = char(tmp);
      data[id][cnt-15+8] = tmp;
    }
    
    //***** Read User Name *****
    if (19 <= cnt && cnt <= flen + 3 ){
      data[id][cnt-15+8] = tmp;
    }
    cnt++;
  }
  //***********End of Serial Data Read**********  

  //########## Display Each Node ##########
  //***** Display RAW Data (optional) *****
  for (int j = 0; j < cnt; j++){
    textFont(font2, 10);
    text(hex(k[j], 2), j*15+10, 640);
  }
  for (int l = 0; l < 4; l++){
    text(i[l], l*7+10, 650);
  }
    
  //***** Display Node Data *****
  for (int m = 0; m < idcnt; m++){
    //** Display Temperature **
    for (int n = 8; n < 12; n++){
      tmptext[n-8] = char(data[m][n]);    //for conversion to char
      fill(237,95,19);
      textFont(font3, 45); 
      text(tmptext[n-8], (n-8)*20 + 216 + (m%5)*156, 110 + (m/5)*110);
    }
     
    //** Display 64 bit Address **
    for (int n = 0; n < 8; n++){
      fill(140,217,185);
      textFont(font2, 10);
      text(hex(data[m][n], 2), n*15 + 210 + (m%5)*156, 155 + (m/5)*110);
    }
   
    //** Display User Name **
    p = 12;
    place = 0.0;
    while(data[m][p] != 10 && p < 80){
      tmptext[p-6] = char(data[m][p]);
      textFont(font2, 16);
      text(tmptext[p-6], place + 200 + (m%5)*156, 142 + (m/5)*110);
      place = place + textWidth(tmptext[p-6]);
      p++;
    }    
  }
}
