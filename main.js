var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start(){
    document.getElementById("box").innerHTML = "";
    recognition.start();
}
recognition.onresult = function (event){
    console.log(event);
    var output = event.results[0][0].transcript;
    document.getElementById("box").innerHTML = output;
    if (output == "take my selfie") {
        speak();
    }
}
function speak() {
    var speechAPI = window.speechSynthesis; //we are storing the api in a varible to convert text into speech.
    speak_data = "Taking Your Selfie In 5 Seconds. "; //we are getting the text to be converted into speech.
    var utterthis = new SpeechSynthesisUtterance(speak_data); //we are converting the text into speech.
    speechAPI.speak(utterthis); //speak() triggers the system to speak var utterthis.
    //code for attaching the webcam
    Webcam.attach("camera");
    //calling the function snapshot after 5 seconds
    setTimeout(() => {
        take_snapshot();
        download();
    }, 5000);
}
//code for setting up the webcam
Webcam.set({
    width: 360,
    height: 250,
    image_format: "png",
    png_quality: 90
});
function take_snapshot() {
    Webcam.snap(//webcam.snap is a predifined function of webcam.js to take a snapshot
        function (img) {//img is used to show the preview of the image taken by the snapshot
            document.getElementById("result").innerHTML = `<img id=captured_image src=${img}>`;
        }
    )
}
function download() {
    var link = document.getElementById("link");
    var image = document.getElementById("captured_image").src;
    link.href = image;
    link.click()
}