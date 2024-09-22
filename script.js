const video = document.getElementById('cameraStream');

// Access the back-facing camera and display the stream
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { exact: "environment" } // Use the back-facing camera
            }
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera: ", err);
    }
}

// Call the function to start the camera
startCamera();

// Fullscreen functionality with UI hiding
const fullscreenBtn = document.getElementById('fullscreenBtn');

fullscreenBtn.addEventListener('click', () => {
    const videoContainer = document.body;

    // Handle fullscreen for iOS devices
    if (video.webkitEnterFullscreen) {
        setTimeout(() => video.webkitEnterFullscreen(), 200); // Delay for iOS Safari
    } else if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen(); // Standard browsers
    } else if (videoContainer.mozRequestFullScreen) { /* Firefox */
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.msRequestFullscreen) { /* IE/Edge */
        videoContainer.msRequestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
        videoContainer.webkitRequestFullscreen();
    }
});

// Handle screen orientation changes to adjust video fit
window.addEventListener('resize', () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio > 1) {
        video.style.objectFit = 'cover'; // Landscape mode
    } else {
        video.style.objectFit = 'contain'; // Portrait mode, avoid cropping
    }
});
