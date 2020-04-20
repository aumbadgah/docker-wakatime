# wakatime language stats service

Wakatime language stats service in a Docker container.

Fetches fresh language stats from Wakatime on interval, stores data in Redis and exposes it through a single API endpoint.

## Try it out

Define your Wakatime API key in `docker-compose.yml` as environment variable `WAKATIME_API_KEY`.

Run `docker-compose build && docker-compose up`.

View your stats at [http://localhost:3000/languages](http://localhost:3000/languages).

## Requirements

Wakatime API key, for more info see [https://wakatime.com/api-key](https://wakatime.com/api-key).

Redis for data storage.

## Environment variables

### DEBUG

Set to `true` to enable debug logging.

Defaults to `false`.

### INTERVAL

Defines how often the data is refreshed from Wakatime. For time formats, see [https://www.npmjs.com/package/ms](https://www.npmjs.com/package/ms).

Defaults to `1d`.

### REDIS_HOST

Redis host, defaults to `redis`.

### REDIS_KEY_STATS

Redis key for current user stats data.

Defaults to `wakatimeStats`.

### RETRY_LIMIT

Limit on how many times request is resent in case Wakatime is still processing data request.

Defaults to `10`.

### RETRY_INTERVAL_MODIFIER

Retries are first sent faster, then further apart. The modifier controls how much longer each following interval is.

Defaults to `2s`.

### WAKATIME_API_KEY

Required.

Wakatime API key, for more info see [https://wakatime.com/api-key](https://wakatime.com/api-key).

### WAKATIME_RANGE

Wakatime time range, for more info see [https://wakatime.com/developers#stats](https://wakatime.com/developers#stats).

Defaults to `last_7_days`.
