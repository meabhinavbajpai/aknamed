import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.43.234:3002/",
  headers: {
    "Content-type": "application/json"
  }
});