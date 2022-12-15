status = "";
objects = [];
song =  ""
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.size(380,380);
    Video.hide();
    ObjectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";

}
function modelLoaded(){
    console.log("model is loaded");
    status = true;
  

}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function preload(){
    song = loadSound("alarm.mp3");
}
function draw(){
    image(Video,0,0,640,420);
    if (status !=""){
        ObjectDetector.detect(Video,gotResults);
        for(i = 0 ; i < objects.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
           
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x + 15,objects[i].y + 15);
            
    noFill();
    stroke("red");
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height  );
if (objects[i].label=="person"){

    document.getElementById("objects").innerHTML = "Baby Found";
    song.stop();

}
else{
    document.getElementById("objects").innerHTML = "Baby Not Found";
    song.play();
}



    
}
if (objects.length==0){

    document.getElementById("objects").innerHTML = "Baby Not Found";
    song.play();
}
    }
   
   
}
