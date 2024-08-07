import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Form from "./elements/Form";
import Button from "./elements/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchToken, generateVideo, finalizeVideo } from "./api";
import { voiceNames } from "./data";
import "./style.css";
export default function DiscussForm() {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [userText, setUserText] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [showPreviewVideo, setShowPreviewVideo] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("Adeline");
  const [title, setTitle] = useState("Generate a Video");
  const [indicator, setIndicator] = useState(false);
  const [paragraphText, setParagraphText] = useState(
    "Please write a text and we will generate a video based on your text"
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId); // Stop increasing once progress reaches 100%
          return 100;
        }
        return prevProgress + 1; // Increase progress by 1% every second
      });
    }, 1000); // Run every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array means this effect runs once on mount


  useEffect(() => {
    if (!authToken) {
      const fetchData = async () => {
        try {
          const data = await fetchToken();
          setAuthToken(data);
          setLoading(false);
        } catch (error) {
          setAuthToken("");
        }
      };

      fetchData();
    }
  }, [authToken]);

  const handleInput = (input) => {
    setUserText(input.target.value);
    setParagraphText(
      "It takes a few minutes to generate a video. Please wait a moment and you can get a video above"
    );
  };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await generateVideo(
      userText,
      authToken.access_token,
      selectedVoice
    );
    setPreviewVideo(result.previewVideo);
    setFinalData(result.forFinal);
    setLoading(false);
  };
  const handleRegenrate = async () => {
    setTitle("Please wait a while to see the new video.");
    const result = await generateVideo(
      userText,
      authToken.access_token,
      selectedVoice,
      setLoading
    );
    setPreviewVideo(result.previewVideo);
    setFinalData(result.forFinal);
    setTitle("Generate a Video");
  };

  useEffect(() => {
    setShowPreviewVideo(true);
  }, [previewVideo]);

  const handleDownload = async () => {
    setIndicator(true);
    const result = await finalizeVideo(
      userText,
      authToken.access_token,
      finalData
    );
    window.location.href = result;
    setIndicator(false);
  };
  function header_text() {
    return title;
  }
  if (previewVideo != null) {
    header_text();
  } else {
  }
  return loading ? (
    <div class="loader"></div>
  ) : (
    <div>
      {previewVideo && (
        <iframe
          width="100%"
          height="700px"
          src={previewVideo}
          title="Video Player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}

      <section className="flex flex-col container mx-auto mt-10 justify-center">
        <Fade bottom>
          {previewVideo ? (
            <h1 className="text-5xl text-theme-red text-center font-bold">
              {header_text()}
            </h1>
          ) : (
            ""
          )}
          <div>
            {showPreviewVideo && previewVideo && (
              <>
                <div>
                  {indicator && (
                    <div class="progress-container">
                      <div
                        class="progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                  <div className="top-buttons">
                    <Button
                      className="button text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none"
                      type="button"
                      onClick={handleDownload}
                    >
                      Download
                    </Button>

                    <Button
                      className="button text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none"
                      type="button"
                      onClick={handleRegenrate}
                    >
                      REGENERATE
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          {previewVideo ? (
            ""
          ) : (
            <p className=" font-light text-lg text-gray-400 text-center mb-12">
              <b>{paragraphText}</b>
            </p>
          )}

          <div className="flex flex-col">
            <div className="mx-auto">
              <Form
                id="projectIdea"
                name="projectIdea"
                type="textarea"
                onChange={(ai) => handleInput(ai)}
                placeholder="Explain about your gift idea"
                className=""
              />
            </div>
            <div className="mx-auto">
              <select
                className="select"
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                {voiceNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              className="button text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none "
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Fade>

        <ToastContainer />
      </section>
    </div>
  );
}
