// Set constraints for the video stream
var constraints = {
    video: {
        facingMode: "enviroment"
    },
    audio: false
};
// Define constants
const cameraView = document.querySelector("#camera--view"), //video
    cameraOutput = document.querySelector("#camera--output"), //img
    cameraSensor = document.querySelector("#camera--sensor"), //canvas
    cameraTrigger = document.querySelector("#camera--trigger"), //button
    cameraSection = document.querySelector(".camera"),
    cameraResult = document.querySelector(".result"),
    cameraReturn = document.querySelector("#camera-icon")

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/png");
    cameraOutput.classList.add("taken");
    cameraSection.style.display = "none";
    document.querySelector(".camera-on").style.display = "none";
    cameraResult.style.display = "block";
    document.querySelector(".camera-off").style.display = "block";
};
// Return camera
cameraReturn.onclick = function () {
    cameraSection.style.display = "block";
    document.querySelector(".camera-on").style.display = "block";
    cameraResult.style.display = "none";
    document.querySelector(".camera-off").style.display = "none";
}
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
