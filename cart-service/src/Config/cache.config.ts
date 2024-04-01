import dotenv from 'dotenv';
import { Redis } from 'ioredis';

dotenv.config()

//details from the env

// Create the Redis Instance
let redis: any;

export const cacheConfig = async () => {
  redis = await new Redis();

  redis.on('connect', () => {
    console.log('Redis Connected');
  });

  redis.on('error', (err: any) => {
    console.log('redis error', err);
  });
};

export const getClient = async () => {
  if (!redis) {
    await cacheConfig();
    return redis;
  } else {
    return redis;
  }
}