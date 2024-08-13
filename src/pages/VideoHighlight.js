import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import Button from "./elements/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchToken } from "./api";
import "./style.css";

export default function VideoHighlight() {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [text, setText] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const [url, setUrl] = useState("");

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

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);

      // Cleanup URL object when file or component is unmounted
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleInput = (event) => {
    console.log(event.target.files);
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("videoFile", file);
    setLoadingMessage(
      "Video summary takes a long time please wait a while until we process it"
    );

    fetch("https://api.krishnavivah.com/hl-video", {
      method: "POST",
      body: formData, // Use FormData object
      // Note: Do not set Content-Type header manually with FormData
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        // setText(data["transcriptionText"]["txt"]);
        // console.log(data, "is data");
        setUrl(data["transcriptionText"]);
        setTimeout(() => {
          console.log(url, "Is url");
          window.location.href = url;
          setLoadingMessage("Video Downloaded");
        }, 1000);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <section className="flex flex-col container mx-auto mt-10 justify-center">
        {text && <div className="text-display">{text}</div>}
        {loadingMessage && <div className="text-display">{loadingMessage}</div>}

        {errorMessage && (
          <div className="text-display-error">{errorMessage}</div>
        )}

        <Fade bottom>
          <div className="flex flex-col">
            <div className="mx-auto file-input">
              <input
                id="projectIdea"
                name="projectIdea"
                type="file"
                onChange={handleInput}
              />
              <label htmlFor="projectIdea">Upload your file</label>
            </div>

            <Button
              className="button text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </Button>

            {fileURL && (
              <div className="mt-5">
                <h3>Preview:</h3>
                <video width="400" controls>
                  <source src={fileURL} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </Fade>

        <ToastContainer />
      </section>
    </div>
  );
}
