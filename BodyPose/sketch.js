let bodyPose;
let video;
let poses = [];
let connections;
let painting;
let img;
let img2;


function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose({flipped: true});
}


function mousePressed() {
  console.log(poses);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // Creamos una capa para graficos
  img = new Image ();
  img.src = "assets/mascara_triste-removebg-preview.png";
  

  img2 = new Image();
  img2.src = "assets/mascara_feliz-removebg-preview.png"

  painting = createGraphics (windowWidth, windowHeight);
  painting.clear();
  // Create the video and hide it
  video = createCapture(VIDEO, {flipped:true}); //para detectar el vídeo
  video.size(windowWidth, windowHeight);
  video.hide();
  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}



// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}



function draw() {
  //cuadros de división de color de la pantalla
  //cuadro de la derecha superior


  /*painting.noStroke(); 
  painting.fill (171, 11, 3, 1);
  painting.rect (width/2, 0, width/2, height/2);

  //cuadro de la izquierda superior
  painting.fill(8, 53, 88, 2); //el cuarto valor pertenece a la opacidad o canal alpha, el RGB son canales de colores
  painting.rect(0, 0, width/2, height/2);

  //cuadro de la izquierda inferior 
  painting.fill(255, 255, 255, 1); //la variable painting porque nuestro proyect0 tiene dos capas que es la del vídeo (canvas) y la de dibujo graphics 
  painting.rect(0, height/2, width/2, height/2); //(x, y, w, h)

  //cuadro de la derecha inferior
  painting.fill(0, 0, 0, 1); 
  painting.rect(width/2, height/2, width/2, height/2);*/


  //fill (0, 128, 128);
  //rect (0, 0, width, height);
  
  //Display the video
  image(video, 0, 0, width, height);

  drawingContext.drawImage(img, 500, 200);
  
  
  // conecciones del esqueleto, las líneas
  /*for (let i = 0; i < poses.length; i++) {
    let pose = poses[i]; //lo que está en corchetes es un array, una lista
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }*/
  
  
  // Iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      //let keypoint = pose.keypoints[j];
      let index1 = pose.keypoints[2];
      let index2 = pose.keypoints[9];

      // Only draw a circle if the keypoint's confidence is greater than 0.1
      /*if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }*/

        //para condicionar que si nuestra muñeca está en un posición aparece un cuadro
        //mano 1
     if (index1.confidence > 0.1){  
        fill (0, 255, 0);
        noStroke();
        circle(index1.x, index1.y, 10);
        drawingContext.drawImage(img2, index1.x - 50, index1.y - 170);
     }
     //figura 1
     if(index2.x > width/2 && index2.y < height/2){
      fill(3, 50, 79);
      //rect(width/2, (height/2)-130, 130, 130);

     }

     //mano 2
     if (index2.confidence > 0.1){  
      fill (0, 255, 0);
      noStroke();
      circle(index2.x, index2.y, 10);
      }
      
      //figura 2
    if(index1.x > width/2 && index1.y < height/2){
      (3, 50, 79);
      //rect(width/2, (height/2)-130, -130, 130); 
      textSize(50);
      text('pruebaa', index2.x, index2.y);
      
     }
    }
  }
  //Aqui colocamos nuestra capa para dibujar hecha con createGraphics
  image(painting, 0, 0);
}