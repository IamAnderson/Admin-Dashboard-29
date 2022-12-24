import axios from "axios";

const BASE_URL = "https://two9server.onrender.com/api/";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGQxYWRiZTgwNzJiMTljZGFmMmRlYSIsImFkbWluIjp0cnVlLCJpYXQiOjE2NzE4ODQ4MDQsImV4cCI6MTY3MjE0NDAwNH0.W-M-OEAHKhLZsKdl4w_jvMWwiGkP_qHBIIXI6x7Uy-g"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});