import axios from "axios";

const LS_KEY = "ff_scheduler_api_base";
export const DEFAULT_BASE =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_DEFAULT_API_BASE) ||
  "http://localhost:8000";

export function getApiBase() {
  if (typeof window === "undefined") return DEFAULT_BASE;
  return window.localStorage.getItem(LS_KEY) || DEFAULT_BASE;
}

export function setApiBase(url) {
  const clean = (url || "").replace(/\/+$/, "");
  window.localStorage.setItem(LS_KEY, clean || DEFAULT_BASE);
}

function client() {
  return axios.create({
    baseURL: getApiBase(),
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });
}

export async function checkHealth() {
  const r = await client().get("/health");
  return r.data;
}

export async function getHelp() {
  const r = await client().get("/help");
  return r.data;
}

export async function generateSchedule(payload) {
  const r = await client().post("/schedule", payload);
  return r.data;
}

export function parseApiError(err) {
  if (err?.response?.data?.error) return err.response.data.error;
  if (err?.code === "ERR_NETWORK")
    return "Network error — is the scheduler Docker container running?";
  if (err?.message) return err.message;
  return "Unknown error";
}
