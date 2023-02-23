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
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export default {
  getLoginUser: () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      return jwt_decode(accessToken);
    }
    return null;
  },

  logout:()=>{
    localStorage.setItem("access_token", "");
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
