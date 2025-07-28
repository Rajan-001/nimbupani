
import { Request, Response, NextFunction } from 'express';
import createRateLimiter from './rate-limiter';


export const rateLimitMiddleware = (apiKey :any, window :number, limit :number) => {
  const limiter = createRateLimiter(apiKey, {
    windowInSeconds: window,
    maxRequests: limit,
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const { success, remaining, reset } = await limiter(ip.toString());
     console.log("working")
    res.setHeader("X-RateLimit-Limit", limit.toString());
    res.setHeader("X-RateLimit-Remaining", remaining.toString());
    res.setHeader("X-RateLimit-Reset", reset.toString());

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
        resetInSeconds: reset,
      });
    }

    next();
  };
};