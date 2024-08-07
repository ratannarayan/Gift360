export const client_id = "14cigj2v4h04l0ih5nmrlma3lq";
export const client_secret =
  "AQICAHiYHceCNnNu5ZM7PgMi0LEySuAHFnWzqHAelsrZ7DzWggGPAgW9SYexiIfkqGED2lCMAAAAlTCBkgYJKoZIhvcNAQcGoIGEMIGBAgEAMHwGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMszOK2gcgWd0Ts800AgEQgE//g1VKXHG2eLB4TxkUFVXdB5ukZVaCJZenFIZY9GHhT8xXkIExWx93INP/qyI6DYMNyTkYV94+5QMvwyQ+isLi+PGWPUwy1hFnrkMyWNMN";
export const fetchToken = async () => {
  const response = await fetch(
    "https://api.pictory.ai/pictoryapis/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
      }),
    }
  );

  const data = await response.json();
  return data;
};

const textToVideoStep1 = (userText, authToken, voice) => {
  const url = "https://api.pictory.ai/pictoryapis/v1/video/storyboard/";
  const data = {
    videoName: "gift360video",
    videoDescription: "sample videos for gift 360 ",
    language: "en",
    audio: {
      aiVoiceOver: {
        speaker: voice,
        speed: "100",
        amplifyLevel: "0",
      },
      autoBackgroundMusic: true,
      backGroundMusicVolume: 0.5,
    },
    textStyles: {
      fontFamily: "Arial",
      textColor: "#FFFFFF",
      fontSize: 32,
      keywordColor: "#6339F8",
      textBackgroundColor: "#000000",
      verticalAlignment: "bottom",
      horizontalAlignment: "center",
    },

    scenes: [
      {
        text: userText,
        voiceOver: true,
        splitTextOnNewLine: true,
        splitTextOnPeriod: true,
      },
    ],
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
      "X-Pictory-User-Id": "ratannarayan",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data; // Return the data here
    })
    .catch((error) => {
      throw error; // Throw error so it can be caught in generateVideo
    });
};
const progressVideo = (userText, authToken, jobId) => {
  const url2 = `https://api.pictory.ai/pictoryapis/v1/jobs/${jobId}`;

  return fetch(url2, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
      "X-Pictory-User-Id": "ratannarayan",
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error! Status: ${response.status}, ${text}`);
      });
    }
    return response.json();
  });
};
async function checkPreviewStatus(userText, authToken, response1Id) {
  const previewJobId = await progressVideo(userText, authToken, response1Id);

  if (previewJobId === undefined) {
    return;
  }

  const status = previewJobId.data.status;

  if (status === "in-progress") {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay
    return checkPreviewStatus(userText, authToken, response1Id); // Recursively call the function
  } else {
    return previewJobId; // Optionally return the final result
  }
}

async function checkPreviewStatus2(userText, authToken, response1Id) {
  const previewJobId = await progressVideo(userText, authToken, response1Id);

  if (previewJobId === undefined) {
    return;
  }

  const status = previewJobId.data.status;
  console.log("status", status);
  if (status === "in-progress") {
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 5-second delay
    return checkPreviewStatus2(userText, authToken, response1Id); // Recursively call the function
  } else {
    return previewJobId; // Optionally return the final result
  }
}

export const generateVideo = async (userText, authToken, voice, setLoading) => {
  try {
    const response1 = await textToVideoStep1(userText, authToken, voice);
    const response1Id = response1.data.job_id;
    const response2 = await checkPreviewStatus(
      userText,
      authToken,
      response1Id
    );
    const previewVideo = response2["data"]["preview"];
    const forFinal = response2["data"]["renderParams"];
    console.log("pr", previewVideo);
    return {
      previewVideo: previewVideo,
      forFinal: forFinal,
    };
  } catch (error) {
    console.error("Error:", error);
  }
};

const finalApiCall = async (userText, authToken, data) => {
  const audio = data.audio;
  const output = data.output;
  const scenes = data.scenes;
  const next_generation_video = data.next_generation_video;
  const containsTextToImage = data.containsTextToImage;

  const toSendToApi = {
    audio: audio,
    output: output,
    scenes: scenes,
    next_generation_video: next_generation_video,
    containsTextToImage: containsTextToImage,
  };

  const url = `https://api.pictory.ai/pictoryapis/v1/video/render`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
      "X-Pictory-User-Id": "ratannarayan",
    },
    body: JSON.stringify(toSendToApi),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error! Status: ${response.status}, ${text}`);
      });
    }
    return response.json();
  });
};
export const finalizeVideo = async (userText, authToken, data) => {
  try {
    const response2 = await finalApiCall(userText, authToken, data);
    const responseId = response2["data"]["job_id"];

    const responseProgress = await checkPreviewStatus2(
      userText,
      authToken,
      responseId
    );
    console.log("here", responseProgress);
    return responseProgress.data.videoURL;
  } catch (error) {
    console.log(error);
  }
};

export async function generateUploadUrl(authToken) {
  const url = "https://api.pictory.ai/pictoryapis/v1/media/generateUrl";

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "eyJraWQiOiJPc0pnWUtUS0tlQkN5eDFKdkVyUGdTZHRpNWRmSzc2aksrTm5mVVI5aVJvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNGNpZ2oydjRoMDRsMGloNW5tcmxtYTNscSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGljdG9yeWFwaXNcL3BpY3RvcnlhcGlzLnJlYWQgcGljdG9yeWFwaXNcL3BpY3RvcnlhcGlzLndyaXRlIiwiYXV0aF90aW1lIjoxNzIyODkyNDg4LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9zbFRDOURZcHoiLCJleHAiOjE3MjI5MzU2ODgsImlhdCI6MTcyMjg5MjQ4OCwidmVyc2lvbiI6MiwianRpIjoiM2FkMzExZDktYzAyYy00NzNiLWEyY2UtZmU4Mzk4YzUxNzM0IiwiY2xpZW50X2lkIjoiMTRjaWdqMnY0aDA0bDBpaDVubXJsbWEzbHEifQ.A4lFOgruuY0vdZhxAm32VVc5U43-lK7DmcVWbSjEG__evSH1dMX0MEs7Thx0kfPOVoNtIrw1nG9ohEkOEbvtR_5KhuczEw0ZjzOhrFi2JN8PgU-dXbShCgB8rM_X_DuSwQpufI1UVo-CHjo_THWjSlB3YRbFObMfBCQL7R8qskKyup1f2YSK5SO0nVansYUsixwU8GbBYc_KMT7RLOzwvLxzYWAnjeulLc9MhlteN2I_ad8E2m1LXGqAqDTc7TPksV-6ynBJTgPOXTAt4kryC2cLZWbg0ZakxgGR5S80H7aVbq6Owg6uuZTUrhdir_pLRqLD7PcK9goGgCBM_UuQzQ",
    "X-Pictory-User-Id": "ratannarayan",
  };

  const data = {
    contentType: "video/mp4",
    fileName: "testvideo.mp4",
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
