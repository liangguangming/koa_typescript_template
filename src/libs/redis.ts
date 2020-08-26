import * as redis from 'redis';

import Logger from './logger';

const logger = new Logger('redis-cli');

const { REDIS_HOST, REDIS_PORT } = process.env;

class RedisClient extends redis.RedisClient {
  public getAsync(key: string) : Promise<string> {
    return new Promise((res, rej) => {
      this.get(key, (err, reply) => {
        if (err) {
          rej(err);
        }
        res(reply);
      });
    });
  }

  public setAsync(key: string, value: string, mode: string, duration: number): Promise<string> {
    return new Promise((res, rej) => {
      this.set(key, value, mode, duration, (err, reply) => {
        if (err) {
          rej(err);
        }
        res(reply);
      });
    });
  }

  public delAsync(key: string) : Promise<number> {
    return new Promise((res, rej) => {
      this.del(key, (err, reply) => {
        if (err) {
          rej(err);
        }
        res(reply);
      });
    });
  }
}

const redisClient = new RedisClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
});

redisClient.on('error', (err) => {
  logger.error({ error: err });
});

export default redisClient;
