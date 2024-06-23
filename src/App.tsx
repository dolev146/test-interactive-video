import { useEffect, useState } from "react";
import "./App.css";

const videoManager = [
  {
    videoName: "video1_badending.mp4",
    buttons: [
      {
        buttonImage: "cart.svg",
        position: "left",
        nextVideo: "good_ending1.mp4",
      },
      {
        position: "middle",
        dreamHeader: "header",
        dreamBody: "body",
        dreamFeelings: "feelings",
      },
      {
        buttonImage: "hand.svg",
        position: "right",
        nextVideo: "good_ending2.mp4",
      },
    ],
  },
  {
    videoName: "good_ending1.mp4",
    buttons: [
      { buttonImage: "vite.svg", position: "left", nextVideo: "c.mp4" },
      {
        position: "middle",
        dreamHeader: "header",
        dreamBody: "body",
        dreamFeelings: "feelings",
      },
      { buttonImage: "vite.svg", position: "right", nextVideo: "c.mp4" },
    ],
    prevVideo: "video1_badending.mp4",
  },

  {
    videoName: "good_ending2.mp4",
    buttons: [
      { buttonImage: "vite.svg", position: "left", nextVideo: "c.mp4" },
      {
        position: "middle",
        dreamHeader: "header",
        dreamBody: "body",
        dreamFeelings: "feelings",
      },
      { buttonImage: "vite.svg", position: "right", nextVideo: "c.mp4" },
    ],
    prevVideo: "video1_badending.mp4",
  },
];

function App() {
  const [currentVideo, setCurrentVideo] = useState(videoManager[0].videoName);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const videoPlayer = document.getElementById(
      "videoPlayer"
    ) as HTMLMediaElement;

    videoPlayer.addEventListener("ended", () => {
      // Show buttons
      videoManager[currentIndex].buttons.forEach((button, idx) => {
        const btn = document.querySelector(`.${button.position}-button`);
        if (btn) btn.classList.add("button-visible");
      });
    });
  }, [currentIndex, currentVideo]);

  const changeVideo = (videoName: string) => {
    const videoIndex = videoManager.findIndex((v) => v.videoName === videoName);
    if (videoIndex !== -1) {
      setCurrentVideo(videoManager[videoIndex].videoName);
      setCurrentIndex(videoIndex);
      const videoPlayer = document.getElementById(
        "videoPlayer"
      ) as HTMLMediaElement;
      // hide buttons
      document
        .querySelectorAll(".left-button, .middle-button, .right-button")
        .forEach((button) => button.classList.remove("button-visible"));
      document
        .querySelectorAll(".left-button, .middle-button, .right-button")
        .forEach((button) => button.classList.add("opacity0"));

      videoPlayer.src = videoManager[videoIndex].videoName;
      videoPlayer.load();
      videoPlayer.play();
    }
  };

  return (
    <div className="videoContainer" id="videoContainer1">
      <video id="videoPlayer" width="100%" height="100%" controls>
        <source src={currentVideo} type="video/mp4" />
      </video>
      {videoManager[currentIndex].buttons.map((button, idx) => (
        <button
          key={idx}
          className={`${button.position}-button opacity0`}
          onClick={() => {
            if (button.nextVideo) {
              changeVideo(button.nextVideo);
            }
          }}
        >
          {button.nextVideo ? (
            <img src={button.buttonImage} alt="Button Icon" />
          ) : (
            <>לקריאת החלום</>
          )}
        </button>
      ))}
    </div>
  );
}

export default App;
