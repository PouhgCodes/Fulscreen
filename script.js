const video = document.getElementById('cameraStream');

// Access the camera and display the stream
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
    const videoContainer = document.body;

    if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen(); // Safari on iOS
    } else if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen(); // Standard browsers
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen(); // Safari desktop
    } else if (videoContainer.mozRequestFullScreen) { /* Firefox */
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.msRequestFullscreen) { /* IE/Edge */
        videoContainer.msRequestFullscreen();
    }
});

// Detect when the fullscreen mode changes and ensure video continues playing
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        video.play(); // Restart video if it freezes after exiting fullscreen
    }
});

document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitIsFullScreen) {
        video.play(); // For Safari
    }
});
