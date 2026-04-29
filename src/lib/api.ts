import axios, { type AxiosInstance, type AxiosError } from "axios";

const LS_KEY = "ff_scheduler_api_base";
export const DEFAULT_BASE: string =
  (typeof process !== "undefined" &&
    (process as NodeJS.Process).env &&
    (process as NodeJS.Process).env.REACT_APP_DEFAULT_API_BASE) ||
  "http://localhost:8000";

export function getApiBase(): string {
  if (typeof window === "undefined") return DEFAULT_BASE;
  return window.localStorage.getItem(LS_KEY) || DEFAULT_BASE;
}

export function setApiBase(url: string | null | undefined): void {
  const clean = (url || "").replace(/\/+$/, "");
  window.localStorage.setItem(LS_KEY, clean || DEFAULT_BASE);
}

function client(): AxiosInstance {
  return axios.create({
    baseURL: getApiBase(),
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });
}

export interface HealthResponse {
  status: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  const r = await client().get<HealthResponse>("/health");
  return r.data;
}

export interface HelpResponse {
  [key: string]: unknown;
}

export async function getHelp(): Promise<HelpResponse> {
  const r = await client().get<HelpResponse>("/help");
  return r.data;
}

export interface SchedulePayload {
  teams: number;
  weeks: number;
  rival_week: number;
  rivals?: string;
  seed?: string;
}

export interface ScheduleResponse {
  schedule: Record<string, [string, string][]>;
  stats: {
    games_per_team: Record<string, number>;
    home_away_balance: Record<string, { home: number; away: number }>;
    rival_matchups: Record<string, number>;
  };
}

export async function generateSchedule(payload: SchedulePayload): Promise<ScheduleResponse> {
  const r = await client().post<ScheduleResponse>("/schedule", payload);
  return r.data;
}

interface ApiErrorResponse {
  error?: string;
}

export function parseApiError(err: unknown): string {
  const axiosErr = err as AxiosError<ApiErrorResponse>;
  if (axiosErr?.response?.data?.error) return axiosErr.response.data.error;
  if (axiosErr?.code === "ERR_NETWORK")
    return "Network error — is the scheduler Docker container running?";
  if (axiosErr?.message) return axiosErr.message;
  return "Unknown error";
}
