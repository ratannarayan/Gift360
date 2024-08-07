import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import Button from "./elements/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchToken } from "./api";
import "./style.css";

export default function VideoToText() {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [fileUserPath, setFileUserPath] = useState("");
  const [fileUserName, setFileUserName] = useState("");
  const [text, setText] = useState();
  const [errorMessage, setErrorMesage] = useState("");

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
    setFileUserName(event.target.files[0].name);
    console.log("file user name", fileUserName);
    setFile(event.target.files[0]); // Store the file object
  };
  function escapeBackslashes(filePath) {
    return filePath.replace(/\\/g, "\\\\");
  }

  const handleSubmit = () => {
    console.log("file Paht", fileUserPath);
    console.log("file Name", fileUserName);
    setErrorMesage("");
    if (file && fileUserPath) {
      fetch("http://localhost:5000/transcribe-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath: fileUserPath,
          fileName: fileUserName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
           
          if (data["success"] == false) {
            setErrorMesage("PARSE_TRANSCRIPTION_FAILED");

            setTimeout(() => {
              handleSubmit();
            }, 2000);
          } else {
            setText(data["transcriptionText"]["txt"]);
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("please send your file or your file path");
    }
  };
  function removeTrailingAndLeadingDoubleQuote(str) {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.slice(1, -1);
    }
    return str;
  }
  function ifItHaveAFileName(str) {
    if (str.endsWith(".mp4")) {
      let lastSlashIndex = str.lastIndexOf("\\");
      return str.substring(0, lastSlashIndex);
    } else {
      return str;
    }
  }

  const handleInputUserFilePath = (event) => {
    const trailingPath = removeTrailingAndLeadingDoubleQuote(
      event.target.value
    );
    const escapeCharaterPath = escapeBackslashes(trailingPath);
    const checkHaveAFileName = ifItHaveAFileName(escapeCharaterPath);
    setFileUserPath(checkHaveAFileName);
  };

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <section className="flex flex-col container mx-auto mt-10 justify-center">
        {text && <div className="text-display">{text}</div>}
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

            <div className="input-container">
              <input
                id="projectIdea"
                name="projectIdea"
                type="text"
                onChange={handleInputUserFilePath}
                placeholder="Path of the video"
                className=""
              />
              <div>Can you please share us the path of the video</div>
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
