const serverURL = "http://localhost:9000"; 

function DoLogin(UserData) {
  return fetch(`${serverURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(UserData),
  }).then((res) => res.json());
}

function DoRegistration(userdata) {
  return fetch(`${serverURL}/user/register`, {
    method: "POST",
    body: userdata,
  });
}

function getLessvideos(limit) {
  return fetch(`${serverURL}/videos/getVideos?limit=${limit}`).then((res) =>
    res.json()
  );
}

function getAllvideos() {
  return fetch(`${serverURL}/videos/getVideos`).then((res) => res.json());
}

function searchVideoWithQuery(query) {
  return fetch(`${serverURL}/videos/getVideos?video=${query}`).then((res) =>
    res.json()
  );
}

function getUsersVideo(token) {
  return fetch(`${serverURL}/videos/myvideos`, {
    method: "GET",
    headers: {
      authorization: `bearer ${token}`,
    },
  }).then((res) => res.json());
}

function DeleteUsersVideo(videoId, token) {
  return fetch(`${serverURL}/videos/deleteVideo/${videoId}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
    },
  }).then((res) => res.json());
}

function GetvideoForPlay(videoId) {
  return fetch(`${serverURL}/videos/getVideos/${videoId}`).then((res) =>
    res.json()
  );
}

function UploadVideoinDB(formdata, token) {
  return fetch(`${serverURL}/videos/uploadVideo`, {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
    },
    body: formdata,
  }).then((res) => res.json());
}

export {
  DoLogin,
  DoRegistration,
  getLessvideos,
  getAllvideos,
  searchVideoWithQuery,
  getUsersVideo,
  DeleteUsersVideo,
  GetvideoForPlay,
  UploadVideoinDB,
};
