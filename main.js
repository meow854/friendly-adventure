sound= "";
rightwristx= 0;
rightwristy= 0;
leftwristx= 0;
leftwristy= 0;
leftwscore= 0;
rightwristscore= 0;

function preload() {
    sound= loadSound("music.mp3");
}

function setup() {
    canvas= createCanvas(600, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    posenet= ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#bad5ff');
    stroke('#3383ff');
    if(leftwscore > 0.2) {
        circle(leftwristx, leftwristy, 20);
        wristnum= Number(leftwristy);
        roundednum= floor(wristnum);
        volume= roundednum/500;
        document.getElementById("volume").innerHTML= "Volume- " + volume;
        sound.setVolume(volume);
    }
    if(rightwristscore > 0.2) {
        circle(rightwristx, rightwristy, 20);
        if(rightwristy > 0 && rightwristy <= 100) {
        document.getElementById("speed").innerHTML= "Speed- 0.5x";
        sound.rate(0.5);
    }
    else if(rightwristy > 100 && rightwristy <= 200) {
        document.getElementById("speed").innerHTML= "Speed- 1x";
        sound.rate(1);
    }
    else if(rightwristy > 200 && rightwristy <= 300) {
        document.getElementById("speed").innerHTML= "Speed- 1.5x";
        sound.rate(1.5);
    }
    else if(rightwristy > 300 && rightwristy <= 400) {
        document.getElementById("speed").innerHTML= "Speed- 2x";
        sound.rate(2);
    }
    else if(rightwristy > 400) {
        document.getElementById("speed").innerHTML= "Speed- 2.5x";
        sound.rate(2.5);
    }
    }
}

function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

function modelloaded() {
    console.log("posenet is ready");
}

function gotposes(results) {
    if(results.length > 0) {
        rightwristx= results[0].pose.rightWrist.x;
        rightwristy= results[0].pose.rightWrist.y;
        console.log("right wrist x= " + rightwristx + "right wrist y= " + rightwristy);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy= results[0].pose.leftWrist.y;
        console.log("left wrist x= " + leftwristx + "left wrist y= " + leftwristy);
        leftwscore= results[0].pose.keypoints[9].score;
        rightwristscore= results[0].pose.keypoints[10].score;
    }
}