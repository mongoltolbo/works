//########################################################
//  Hayaoshi Program
//  Keio University Westlab 2012.11

//  Judges and displays the order of replies.
//########################################################

int[][] data = new int[50][100];
char[] i = new char[10];
char[] tmptext = new char[100];
int[] k = new int[100];
int[] idchk = new int[50];
int[] addrtmp = new int[8];

String text1 = "WestLab";
String text2 = "Keio University";
String text3 = "NO.";

boolean rectOver = false;
int rectX = 849;      //Rect X Position
int rectY = 100;      //Rect Y Position
int rectSize = 30;    //Rect Size

int tmp, cnt, p;
int id = 0;
int idcnt = 0;
int b = 0;
int flen = 0;
int OFFSET = 220;
int rank = 0;
int flag = 0;
int sent = 0;
float place = 0.0;
float place2 = 0.0;

import processing.serial.*;

PFont font1, font2;
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

  //***** Make a new instance of a PImage by loading an image file *****
  img = loadImage("rank_bg.jpg");
  smooth();
}

void draw()
{
  //########## Initial Setup ##########
  update(mouseX, mouseY);
  
  //***** Draw Background *****
  image(img,0,0);
  
  //***** If Reset *****
  if(flag == 1){
    for(int m = 0; m < idcnt; m++){
      data[m][8] = 0;
    }
    flag = 0;
    rank = 0;
    api_reset();    //send broadcast reset command
  }

  fill(255);  
  textAlign(LEFT);

  //########## Serial Data Read ##########
  while ( myPort.available() > 0) {  // If data is available,
    tmp = myPort.read();
    if((tmp == 0x7E) && (cnt > 14)){
      cnt = 0;    //reset counter;
    }
    
    //***** Read Frame Length *****
    if ( cnt == 2 ){
      flen = tmp;
      sent = 0;
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
    if (cnt == 12 | cnt == 13){
      data[id][cnt-3] = tmp;
    }

    //***** Read User Name *****
    k[cnt] = tmp;    //For Displaying RAW Data    
    if (cnt == 15){    //insert first name char and rank
      data[id][11] = tmp;
      if (data[id][8] == 0){
        rank++;
        data[id][8] = rank;
        if (rank == 1){  //if 1st place, send tx data
          api_send(id);       
        }
      }
    }    
    if (15 < cnt && cnt <= flen + 3){    //insert name
      data[id][cnt-15+11] = tmp;
    }
    cnt++;
  }
  //***********End of Serial Data Read**********
  
  //########## Display Each Node ##########
  //***** Display RAW Data (optional) *****
  for (int j = 0; j < cnt; j++){
      textFont(font2, 10);
      text(hex(k[j], 2), j*15+10, 670);
  }
  
  //***** Display Node Data *****
  for (int m = 0; m < idcnt; m++){    //display 64bit address
    for (int n = 0; n < 8; n++){
      fill(140,217,185);
      textFont(font2, 14);
      text(hex(data[m][n], 2), n*17 + 198 + (m%5)*158, 15 + OFFSET + (m/5)*99);
    }
    p = 11;
    place = 0.0;
    place2 = 0.0;
    //** Display Name **
    while(data[m][p] != 10 && p < 80){
      fill(140,217,185);
      tmptext[p-11] = char(data[m][p]);
      textFont(font2, 16);
      text(tmptext[p-11], place + 198 + (m%5)*158, -8 + OFFSET + (m/5)*98);
      place = place + textWidth(tmptext[p-11]);
      textFont(font2, 36);
      /* 1st Place */
      if(data[m][8] == 1){
        fill(255);
        text(tmptext[p-11], place2 + 250, 49);
        place2 = place2 + textWidth(tmptext[p-11]);
      }
      /* 2nd Place */
      if(data[m][8] == 2){
        fill(128);
        text(tmptext[p-11], place2 + 250, 94);
        place2 = place2 + textWidth(tmptext[p-11]);
      }
      /* 3rd Place */
      if(data[m][8] == 3){
        fill(128);
        text(tmptext[p-11], place2 + 250, 139);
        place2 = place2 + textWidth(tmptext[p-11]);
      }
      p++;
    }
    //** Display Individual Order Number **
    if (data[m][8] != 0){
      fill(237,95,19);
      textFont(font1,10);        
      text(text3,220 + (m%5)*158,-35 + OFFSET + (m/5)*99);
      noStroke();
      textFont(font2, 16);
      text(data[m][8], 242 + (m%5)*158, -35 + OFFSET + (m/5)*99);
    }
  }
}

//***** Check Mouse Position *****
void update(int x, int y)
{
  if ( overRect(rectX, rectY, rectSize*4, rectSize) ) {
    rectOver = true;
  } else {
    rectOver = false;
  }
}

//***** When Mouse Pressed *****
void mousePressed()
{
  if(rectOver) {
    flag = 1;
  }
}

//***** Check if Over Rect *****
boolean overRect(int x, int y, int width, int height) 
{
  if (mouseX >= x && mouseX <= x+width && 
      mouseY >= y && mouseY <= y+height) {
    return true;
  } else {
    return false;
  }
}

//***** Transmit Reset Data to Xbee *****
void api_reset(){
  int[] tx_data = {0x7E, 0x00, 0x0F, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFE, 0x01, 0x00, 0x00, 0xF3};
  for(int n = 0; n < 19; n++){
    myPort.write(tx_data[n]);
  }  
}

//***** Transmit 1st Place Data to Xbee *****
void api_send(int tx_id)
{
  int[] tx_data = {0x7E, 0x00, 0x0F, 0x10, 0x00, 0x00, 0x13, 0xA2, 0x00, data[tx_id][4], data[tx_id][5], data[tx_id][6], data[tx_id][7], data[tx_id][9], data[tx_id][10], 0x00, 0x00, 0x01, 0x00};
  int checksum=0;
  for(int n = 3; n < 18; n++){
    checksum += tx_data[n];
  }
  tx_data[18] = 0xFF - ( 0x000000FF & checksum );
  for(int n = 0; n < 19; n++){
    myPort.write(tx_data[n]);
  }
}
