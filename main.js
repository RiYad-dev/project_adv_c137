let status;
let value;
let lbl;
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            fill('#ff0000');
            stroke('#ff0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            lbl = objects[i].label;
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        document.getElementById("status").innerHTML = "Status: Object Detected";
        console.log(results);
        objects = results;
    }
}
function start() {
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    value = document.getElementById("input").value;
    if (lbl == value) {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML = lbl + "found!";
        var synth = new SpeechSynthesisUtterance(lbl + " found");
        window.speechSynthesis.speak(synth);
    } else {
        document.getElementById("status").innerHTML = "Object mentioned not found";
    }
}