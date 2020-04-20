import { promisify } from "util";
import Redis from "redis";

import { REDIS_HOST } from "./config";

const redis = Redis.createClient({
  host: REDIS_HOST,
});

const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);

const get = async (key: string) => {
  const raw = await getAsync(key);
  return JSON.parse(raw);
};

const set = async (key: string, payload: any) => {
  const value = JSON.stringify(payload);
  await setAsync(key, value);
};

export default {
  get,
  set,
};
