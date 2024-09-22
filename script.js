// Access the camera and display the stream
const video = document.getElementById('cameraStream');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera: ", err);
    }
}

// Call the function to start the camera
startCamera();

// Fullscreen functionality
const fullscreenBtn = document.getElementById('fullscreenBtn');

fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.body.requestFullscreen();
    }
});
