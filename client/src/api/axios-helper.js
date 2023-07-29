import axios from "axios";

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();

  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: { signal: newAbortSignal(5000) },
});

export default api;
