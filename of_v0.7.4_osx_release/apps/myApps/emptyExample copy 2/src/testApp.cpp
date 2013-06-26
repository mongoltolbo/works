#include "testApp.h"

#define NUM 8

float loc_x[NUM];
float loc_y[NUM];
float sp_x[NUM];
float sp_y[NUM];
float radius[NUM];
int red[NUM];
int green[NUM];
int blue[NUM];
bool mouse_pressed;
float gravity;
float friction;



//--------------------------------------------------------------
void testApp::setup(){
//    ofBackground(0, 0, 0);
    ofSetBackgroundAuto(false);
    ofBackground(255, 255, 255);
//    ofSetFrameRate(8);
    ofSetFrameRate(8);
    ofSetCircleResolution(64);
    ofEnableAlphaBlending();
    mouse_pressed = false;
    gravity = 0.1;
    friction = 0.999;
    
    for (int i = 0; i < NUM; i++) {
        loc_x[i] = ofGetWidth() / 2;
        loc_y[i] = ofGetHeight() / 2;
        sp_x[i] = ofRandom(-10, 10);
        sp_y[i] = ofRandom(-10, 10);
        radius[i] = ofRandom(10, 30);
        red[i] = ofRandom(200, 255);
        green[i] = ofRandom(200, 255);
        blue[i] = ofRandom(200, 255);
    }
    
    myImage.loadImage("area.png");
}

//--------------------------------------------------------------
void testApp::update(){
//    for (int i = 0; i < NUM; i++) {
//        if(mouse_pressed){
//            sp_x[i] = (mouseX - loc_x[i]) / 8.0;
//            sp_y[i] = (mouseY - loc_y[i]) / 8.0;
//        }
//        
//        sp_x[i] = sp_x[i] * friction;
//        sp_y[i] = sp_y[i] * friction;
//        sp_y[i] = sp_y[i] + gravity;
//        
//        loc_x[i] = loc_x[i] + sp_x[i];
//        loc_y[i] = loc_y[i] + sp_y[i];
//        
//        if(loc_x[i] < 0){
//            loc_x[i] = 0;
//            sp_x[i] = sp_x[i] * -1.0;
//        }
//        if(loc_x[i] > ofGetWidth()){
//            loc_x[i] = ofGetWidth();
//            sp_x[i] = sp_x[i] * -1.0;
//        }
//        if (loc_y[i] < 0) {
//            loc_y[i] = 0;
//            sp_y[i] = sp_y[i] * -1.0;
//        }
//        if ( loc_y[i] > ofGetHeight()){
//            loc_y[i] = ofGetHeight();
//            sp_y[i] = sp_y[i] * -1.0;
//        }
//    }
}

//--------------------------------------------------------------
void testApp::draw(){
    ofSetColor(235, 235, 235,25);
    ofRect(0, 0, ofGetWidth(), ofGetHeight());
//    for (int i = 0;  i< NUM; i++) {
//        ofSetColor(red[i], green[i], blue[i], 127);
//        ofCircle(loc_x[i], loc_y[i], radius[i]);
//    }
    ofSetColor(ofRandom(50,255), 100, ofRandom(200,255), 90);
    ofCircle(ofRandom(2*ofGetWidth()/5, 3*ofGetWidth()/5), ofRandom(2*ofGetHeight()/5, 3*ofGetHeight()/5), ofRandom(5, 60));
    
    ofSetColor(255, 255, 255);
    myImage.draw(ofGetWidth()/2-100, ofGetHeight()/2-100);
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
    mouse_pressed = true;
}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){
    mouse_pressed = false;
    
    for (int i = 0;  i < NUM; i++) {
        sp_x[i] = ofRandom(-10, 10);
        sp_y[i] = ofRandom(-10, 10);
    }
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