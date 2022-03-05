import axios from "axios";

const API_KEY = "AIzaSyBj2_2ygB8w_DwQR-PDfDPCkuUSDLqleQg";

export const api = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: API_KEY,
  },
});
