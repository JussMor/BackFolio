const redis = require("redis");

const client =  redis.createClient({
  url: process.env.REDIS_URL,
  tls: {
    rejectUnauthorized: false
  }
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("ready", () => {
  console.log("Redis client ready");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;


