import { redis } from 'models/database';

/** Redis DB에 데이터를 저장함 */
export const setRedisData = async (key: string, value: string) => {
  try {
    await redis.set(key, value);
  } catch (err) {
    console.warn(err);
  }
};

/** Redis DB에 데이터를 가져옴 */
export const getRedisData = async (key: string) => {
  try {
    const value = await redis.get(key);
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.warn(err);
  }
};
