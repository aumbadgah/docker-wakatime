import express from "express";
import cors from "cors";

import { corsWhitelist, port, REDIS_KEY_STATS } from "./config";
import redis from "./redis";
import waka from "./waka";

let app = express();

declare global {
  namespace Express {
    interface Request {
      startTime: number;
    }
  }
}

app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use((req, res, next) => {
  res.on("finish", () => {
    const now = new Date();
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${
        Date.now() - req.startTime
      } ms`
    );
  });
  next();
});

waka.start();

interface Language {
  name: string;
  percent: number;
}

app.get("/languages", async (req, res) => {
  const stats = await redis.get(REDIS_KEY_STATS);

  const { start, end } = stats.data;

  const languages = stats.data.languages.map(({ name, percent }: Language) => ({
    name,
    percent,
  }));

  const response = {
    meta: {
      start,
      end,
    },
    data: {
      languages,
    },
  };

  res.set("Cache-Control", "public, max-age=86400");
  res.send(response);
});

app.listen(port, () => {
  console.log(`listening in ${port}...`);
});
