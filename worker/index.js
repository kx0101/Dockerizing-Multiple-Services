import keys from "./keys.js";
import redis from "redis";

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib (element) {
  const sequence = [0, 1];

  for (let i = 2; i <= element; i++) {
    sequence[i] = sequence[i - 2] + sequence[i - 1];
  }

  return sequence[element];
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subcribe('insert');
