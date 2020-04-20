import ms from "ms";
import axios from "axios";

import {
  DEBUG,
  INTERVAL,
  REDIS_KEY_STATS,
  RETRY_LIMIT,
  RETRY_INTERVAL_MODIFIER,
  WAKATIME_API_KEY,
  WAKATIME_RANGE,
} from "./config";
import redis from "./redis";

const wakatime = axios.create({
  baseURL: "https://wakatime.com/api/v1/",
  timeout: ms("1m"),
  headers: {
    Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
  },
});

const timeout = async (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const getStats = async (counter = 1): Promise<any> => {
  let response;
  if (counter === 1) {
    console.log("requesting stats");
  }
  try {
    if (DEBUG) {
      console.log(`sending request ${counter} / ${RETRY_LIMIT}`);
    }
    response = await wakatime.get(`users/current/stats/${WAKATIME_RANGE}`);
  } catch (error) {
    throw error;
  }

  if (DEBUG) {
    console.log(response);
  }

  if (
    response &&
    response.data &&
    response.data.data &&
    response.data.data.status &&
    response.data.data.status === "ok"
  ) {
    if (DEBUG) {
      console.log("request success");
    }
    return response.data;
  } else if (
    response.data.data.status === "pending_update" &&
    counter < RETRY_LIMIT
  ) {
    const delay = counter * ms(RETRY_INTERVAL_MODIFIER);
    if (DEBUG) {
      console.log(`request pending, sleeping ${ms(delay, { long: true })}`);
    }
    await timeout(delay);

    console.log(`retrying...`);
    return getStats(counter + 1);
  }

  throw new Error("invalid response from wakatime");
};

const write = async (stats: any) => {
  console.log("writing to redis");
  await redis.set(REDIS_KEY_STATS, stats);
};

const start = async () => {
  let stats;

  try {
    stats = await getStats();
    await write(stats);
  } catch (error) {
    console.error(error);
  }

  const delay = ms(INTERVAL);
  console.log(`sleeping ${ms(delay, { long: true })}`);
  await timeout(delay);
  start();
};

const waka = {
  start,
};

export default waka;
