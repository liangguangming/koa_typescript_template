import redisClient from '../../libs/redis';

class RedisStore {
  static async get(key: string) {
    const data = await redisClient.getAsync(`SESSION:${key}`);
    return JSON.parse(data);
  }

  static async set(key: string, sess: Object, maxAge: number) {
    await redisClient.setAsync(`SESSION:${key}`, JSON.stringify(sess), 'EX', maxAge / 1000);
  }

  static async destroy(key: string) {
    const res = await redisClient.delAsync(`SESSION:${key}`);
    return res;
  }
}

export default RedisStore;
