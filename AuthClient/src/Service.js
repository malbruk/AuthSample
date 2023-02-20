import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = "https://localhost:7101/api";
setAuthorizationBearer();

function saveAccessToken(authResult) {
  localStorage.setItem("access_token", authResult.token);
  setAuthorizationBearer();
}

function setAuthorizationBearer() {
  const accessToken = localStorage.getItem("access_token");
  console.log("accessToken", accessToken);
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log("error", error);
    if (error.response.status == 401) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export default {
  getLoginUser: () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      console.log("jwt_decode(accessToken)", jwt_decode(accessToken));
      return jwt_decode(accessToken);
    }
    return null;
  },

  logout:()=>{
    console.log('clear access_token')
    localStorage.setItem("access_token", "");
    console.log('access_token',localStorage.getItem("access_token") )
  },

  register: async (email, password) => {
    const res = await axios.post("/register", { email, password });
    saveAccessToken(res.data);
  },

  login: async (email, password) => {
    const res = await axios.post("/login", { email, password });
    saveAccessToken(res.data);
  },

  getPublic: async () => {
    const res = await axios.get("/public");
    return res.data;
  },

  getPrivate: async () => {
    const res = await axios.get("/private");
    return res.data;
  },
};
