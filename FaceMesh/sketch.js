let faceMesh;
let options = { maxFaces: 1, refineLandmarks: false, flipped: true };
let video;
let faces = [];


function preload() {
  faceMesh = ml5.faceMesh(options);
}

function mousePressed(){
  console.log(faces);
}

function setup() {
  createCanvas(640, 480);
  // Create the video and hide it
  video = createCapture(VIDEO, {flipped:true});
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

function draw() {
  image(video, 0, 0, width, height);
// Draw all the tracked face points
for (let i = 0; i < faces.length; i++) { //i++ significa a 0 sumale 1, luego sumale otro 1 y otro 1 y así//
  let face = faces[i];
for (let j = 0; j < face.keypoints.length; j++) { //un for necesita 3 variables//
  let keypoint = face.keypoints[j];
    fill(0, 255, 0);
    noStroke();
    circle(keypoint.x, keypoint.y, 5); //el 5 es el tamaño de los punto//
  }
}
}

