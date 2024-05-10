import { Redis } from "@upstash/redis/cloudflare";
import { Handler } from "hono";

export const fetchLatestPosts: Handler = async (c) => {
  const take = Number(c.req.query("take"));
  const cursorPostId = c.req.query("cursorPostId");

  const redis = new Redis({
    url: c.env.UPSTASH_REDIS_REST_URL,
    token: c.env.UPSTASH_REDIS_REST_TOKEN,
  });

  


};