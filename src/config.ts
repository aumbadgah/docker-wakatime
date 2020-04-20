export const port = process.env.PORT || "3000";

export const corsWhitelist = [
  "https://aumbadgah.com",
  "https://beta.aumbadgah.com",
  "https://api.aumbadgah.com",
  "http://localhost:8000",
];

export const DEBUG = process.env.DEBUG === "true";
export const INTERVAL = process.env.INTERVAL || "1d";
export const REDIS_HOST = process.env.REDIS_HOST || "redis";
export const REDIS_KEY_STATS = process.env.REDIS_KEY_STATS || "wakatimeStats";
export const RETRY_LIMIT = process.env.RETRY_LIMIT
  ? parseInt(process.env.RETRY_LIMIT, 10)
  : 10;
export const RETRY_INTERVAL_MODIFIER =
  process.env.RETRY_INTERVAL_MODIFIER || "2s";
export const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
export const WAKATIME_RANGE = process.env.WAKATIME_RANGE || "last_7_days";

export default {
  corsWhitelist,
  port,
  DEBUG,
  REDIS_HOST,
  INTERVAL,
  REDIS_KEY_STATS,
  RETRY_LIMIT,
  RETRY_INTERVAL_MODIFIER,
  WAKATIME_API_KEY,
};
