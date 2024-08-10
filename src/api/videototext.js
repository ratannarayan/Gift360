import axios from "axios";
import payloads from "./payload"
const BASE_URL = "https://api.pictory.ai";
const AUTH_ROUTE = "/pictoryapis/v1/oauth2/token";
const TRANSCRIPTION_ROUTE = "/pictoryapis/v2/transcription";
const GENERATEURL_ROUTE = "/pictoryapis/v1/media/generateUrl";
const GET_JOB_ROUTE = "/pictoryapis/v1/jobs/";
const VIDEO_PATH = "video.mp4";
const WEBHOOK_URL = "WEBHOOK_URL";
const CLIENT_ID = "14cigj2v4h04l0ih5nmrlma3lq";
const CLIENT_SECRET =
  "AQICAHiYHceCNnNu5ZM7PgMi0LEySuAHFnWzqHAelsrZ7DzWggGPAgW9SYexiIfkqGED2lCMAAAAlTCBkgYJKoZIhvcNAQcGoIGEMIGBAgEAMHwGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMszOK2gcgWd0Ts800AgEQgE//g1VKXHG2eLB4TxkUFVXdB5ukZVaCJZenFIZY9GHhT8xXkIExWx93INP/qyI6DYMNyTkYV94+5QMvwyQ+isLi+PGWPUwy1hFnrkMyWNMN";
const USER_ID = "santsaicorporationpvtltd";

// Generates token with clientid and client secret
async function getToken(CLIENT_ID, CLIENT_SECRET) {
  const url = `${BASE_URL}${AUTH_ROUTE}`;
  const authPayload = payloads.createAuthTokenPayload(CLIENT_ID, CLIENT_SECRET);
  const payload = JSON.stringify(authPayload);
  const headers = payloads.setAuthHeaders();

  try {
    let response = await axios.post(url, payload, {
      headers: headers,
    });
    return response.data.access_token;
  } catch (e) {
    console.error(`Error while fetching token: ${e}`);
    return null;
  }
}

async function generateUploadUrl(token) {
  const url = `${BASE_URL}${GENERATEURL_ROUTE}`;
  const headers = payloads.setHeaders(token, USER_ID);
  const generateUrlPayload = payloads.createGenerateUrlPayload("testvideo.mp4");
  const payload = JSON.stringify(generateUrlPayload);

  try {
    let response = await axios.post(url, payload, {
      headers: headers,
    });
    return response.data.data;
  } catch (e) {
    console.error(`Error while generate url: ${e}`);
    return null;
  }
}
// Upload video function
async function uploadVideo(url, videoFile) {
  const headers = { "Content-Type": "video/mp4" };
  const videoData = await new Promise((resolve, reject) => {
    const filePath = videoFile.path;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  try {
    let response = await axios.put(url, videoData, { headers });
    console.log("Video uploaded successfully!");
    return response;
  } catch (e) {
    console.error(`Error uploading video: ${e}`);
  }
}

// Create transcription function
async function createTranscription(token, fileUrl, language) {
  const url = `${BASE_URL}${TRANSCRIPTION_ROUTE}`;
  const transcriptionPayload = payloads.createTranscriptionPayload(
    fileUrl,
    language,
    WEBHOOK_URL
  );
  const headers = payloads.setHeaders(token, USER_ID);

  try {
    let response = await axios.post(url, transcriptionPayload, { headers });
    const jobId = response.data.data.jobId;
    return jobId;
  } catch (e) {
    console.error(`Error while storyboard: ${e}`);
    return null;
  }
}

// Get job status function
async function getJobId(token, jobId) {
  const url = `${BASE_URL}${GET_JOB_ROUTE}${jobId}`;
  const headers = payloads.setHeaders(token, USER_ID);

  try {
    let response = await axios.get(url, { headers });
    return response.data.data;
  } catch (e) {
    console.error(`Error while get jobid: ${e}`);
    return null;
  }
}
// Waits for transcription job to get complete
async function waitForTranscriptionJobToComplete(token, jobid) {
  let response = await getJobId(token, jobid);
  while (JSON.stringify(response).includes("in-progress")) {
    response = await getJobId(token, jobid);
  }
  return response;
}

export async function createFinalTranscription(videoFile) {
  const token = await getToken(CLIENT_ID, CLIENT_SECRET);
  const data = await generateUploadUrl(token);
  await uploadVideo(data.signedUrl, videoFile);
  const jobid = await createTranscription(token, data.url, "en-US");
  console.log("job id", jobid);
  const transcriptiondata = await waitForTranscriptionJobToComplete(
    token,
    jobid
  );
  return transcriptiondata;
}

// // createFinalTranscription("h.mp4", "C:\\Users\\Abel\\Downloads\\");
// const express = require("express");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// // Configure multer to accept a single file with the field name 'videoFile'
// const upload = multer({ dest: "uploads/" }).single("videoFile");
// const cors = require("cors");
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use(
//   cors({
//     origin: "*", // Allow all origins
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type, Authorization",
//   })
// );

// const port = 5000;
// function addBackslashes(inputString) {
//   return inputString.replace(/\\/g, "\\\\");
// }

// app.post("/transcribe-video", async (req, res) => {
//   try {
//     // Wrap multer upload in a promise
//     await new Promise((resolve, reject) => {
//       upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//           reject({ status: 400, message: err.message });
//         } else if (err) {
//           reject({ status: 500, message: err.message });
//         } else if (!req.file) {
//           reject({ status: 400, message: "No video file sent." });
//         } else if (!req.file.mimetype.startsWith("video/")) {
//           reject({ status: 400, message: "Uploaded content is not a video." });
//         } else {
//           // Resolve promise if upload was successful
//           resolve(req.file);
//         }
//       });
//     });

//     // At this point, req.file is guaranteed to be a video file
//     const videoFile = req.file;

//     // Call createFinalTranscription with videoFile
//     const transcriptionText = await createFinalTranscription(videoFile);

//     // Send transcription text in response
//     return res.json({ transcriptionText });
//   } catch ({ status, message }) {
//     // Handle errors
//     console.error(message);
//     return res
//       .status(status || 500)
//       .send(message || "Failed to process the video transcription.");
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });