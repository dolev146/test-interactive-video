import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const videoPlayer = document.getElementById("videoPlayer");
    const buttons = document.querySelectorAll(
      ".centered-button, .centered-button2, .centered-button3"
    );
    console.log(videoPlayer);

    videoPlayer.addEventListener("timeupdate", function () {
      console.log("timeupdate"), videoPlayer.currentTime;
      if (videoPlayer.currentTime >= 3 && videoPlayer.currentTime <= 6) {
        buttons.forEach((button) => button.classList.add("button-visible"));
      } else {
        buttons.forEach((button) => button.classList.remove("button-faded"));
      }
    });

    return () => {};
  }, []);

  const toggleVideo = () => {
    const videoContainer = document.getElementById("videoContainer1");
    const buttons = document.querySelectorAll(
      ".centered-button, .centered-button2, .centered-button3"
    );
    buttons.forEach((button) => button.classList.add("button-faded"));
    videoContainer.style.opacity = 0;
    // Wait for some time before removing the class, 1 second matches your CSS transition time
    setTimeout(() => {
      videoContainer.style.opacity = 1;
      const video = document.getElementById("videoPlayer");
      video.src = "b.mp4";
      video.load();
      video?.play();
    }, 1000); // Delay in milliseconds
  };

  return (
    <div className="videoContainer" id="videoContainer1">
      <video
        style={{ position: "relative" }}
        id="videoPlayer"
        width="100%"
        height="100%"
        controls
      >
        <source src="a.mp4" type="video/mp4" />
      </video>
      <button className="centered-button" onClick={toggleVideo}>
        Toggle Video
      </button>
      <button className="centered-button2" onClick={toggleVideo}>
        Toggle Video2
      </button>
      <button className="centered-button3" onClick={toggleVideo}>
        Toggle Video3
      </button>
    </div>
  );
}

export default App;
