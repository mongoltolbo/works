#include "testApp.h"

#define numObj 100

float loc_x[numObj];
float loc_y[numObj];

float sp_x[numObj];
float sp_y[numObj];




//--------------------------------------------------------------
void testApp::setup(){
    ofEnableAlphaBlending();
    ofBackground(0, 0, 0);
    ofSetFrameRate(60);
    ofSetCircleResolution(64*2);
    ofEnableSmoothing();
    float width = ofGetWidth();
    float height = ofGetHeight();
    for (int i = 0; i < numObj; i++) {
        loc_x[i] = ofRandom(width);
        loc_y[i] = ofRandom(height);
        sp_x[i] = ofRandom(10);
        sp_y[i] = ofRandom(10);
    }
}

//--------------------------------------------------------------
void testApp::update(){
    
    float width = ofGetWidth();
    float height = ofGetHeight();

    for (int i = 0; i < numObj; i++) {
        if (loc_x[i] < 0 || loc_x[i] > width) {
            sp_x[i] = -sp_x[i];
        }
        
        if (loc_y[i] < 0 || loc_y[i] > height) {
            sp_y[i] = -sp_y[i];
        }
        loc_x[i] += sp_x[i];
        loc_y[i] += sp_y[i];
    }
    
    
    
//    if (loc_x < 0 ) {
//        loc_x = width;
//    } else if (loc_x > width){
//        loc_x = 0;
//    }
//    
//    if (loc_y < 0 ) {
//        loc_y = height;
//    } else if (loc_y > height){
//        loc_y = 0;
//    }
    

    
    
}

//--------------------------------------------------------------
void testApp::draw(){
    //Animation - 1
    ofSetColor(31, 63, 255);
    for (int i = 0; i < numObj; i++) {
        ofCircle(loc_x[i], loc_y[i], 40);
    }
    

    
    
    ////    paul_smith
//    float width = ofGetWidth();
//    float height = ofGetHeight();
//    int Numlines = 1000;
//    float x[Numlines];
//    float y[Numlines];
//    
//    for (int i = 0; i < Numlines; i++) {
//        x[i] = ofRandom(width);
//        y[i] = ofRandom(height);
//    }
//    
//    for (int j = 0; j < Numlines; j++) {
//        ofLine(0, y[j], width, y[j]);
//    }
    
    
    
    
////    random line
//    float width = ofGetWidth();
//    float height = ofGetHeight();
//    float x[1000];
//    float y[1000];
//    ofSetColor(ofRandom(100, 255), 255, 255);
//    
//    for (int i = 0; i < 1000; i++) {
//        x[i] = ofRandom(width);
//        y[i] = ofRandom(height);
//    }
//    
//    for (int j = 0;  j < 1000; j++) {
//        ofLine(x[j], y[j], x[j+1], y[j+1]);
//    }
//    
    
    
////random cloud
//    float width = ofGetWidth();
//    float height = ofGetHeight();
//    float x[1000];
//    float y[1000];
//    
//    for (int i = 0; i < 1000; i++) {
//        x[i] = ofRandom(width);
//        y[i] = ofRandom(height);
//    }
//    
//    ofSetColor(200, 100, 100, 50);
//    for (int j = 0; j < 1000; j++) {
//        ofCircle(x[j], y[j], ofRandom(30));
//    }
//    
////    ofSleepMillis(10);
    
    
    
    
    //Third Practice - colorful carpet
//    float x = ofGetWidth();
//    float y = ofGetHeight();
//    for (int i = 0; i < x; i++) {
//        for (int j = 0; j < y; j++) {
//            ofSetColor(255/x*i, 255/y*j, 100);
////            ofSetColor(ofRandom(0,255), ofRandom(255), ofRandom(255));
//            ofRect(i, j, 1, 1);
//        }
//    }

    
    //Second Practice - Sphere
//    float x = ofGetWidth();
//    float y = ofGetHeight();
//    float rad;
//    x = 1024/2;
//    y = 768/2;
//    
//    rad = 1;
//    
//    
//    for (int i = 0; i < 200; i++) {
//        ofSetColor(31, 127, 255, 100-i);
//        ofCircle(x + i*rad*sin(PI/4), y + i*rad*sin(PI/4), 10 + rad*i);
//    }
    
    
    //Fist Paractice
    //    ofLine(100, 300, 800, 500);
    //    ofRect(100, 100, 300, 300);
    //    ofCircle(800, 800, 200);
    //    ofSetColor(100, 100, 200, 70);
    //    ofEllipse(100, 100, 400, 300);
    //    ofSetColor(100, 200, 100, 70);
    //    ofTriangle(200, 200, 300, 300, 100, 400);
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){
    
}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y){
    
}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){
    
}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){
    
}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){
    
}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){
    
}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){
    
}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){ 
    
}