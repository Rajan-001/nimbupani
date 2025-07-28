import { redis } from "@repo/redis-utils/redis";

export default function createRateLimiter  (apiKey: any, options: { windowInSeconds: any; maxRequests: any; }) {
  const { windowInSeconds, maxRequests } = options;

  return async (ip: any) => {
    const key = `rl:${apiKey}:${ip}`;
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowInSeconds);
    }
    const ttl = await redis.ttl(key);
    return {
      success: current <= maxRequests,
      remaining: Math.max(0, maxRequests - current),
      reset: ttl,
    };
  };
};
