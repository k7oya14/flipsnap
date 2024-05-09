import { prisma } from "./prisma"; // import your extended Prisma Client instance
import { fetchUserInfo } from "./utils";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

async function main() {
  console.log("Listening for new posts...")

  const subscription = await prisma.post.subscribe({
    create: {},
  });

  for await (const event of subscription) {
    const userInfo = await fetchUserInfo(event.created.authorId);
    const data = { ...event.created, author: userInfo };
    console.log("received new post :", "id:"+data.id+",", "author:"+data.author?.name+",", "caption:"+data.caption);

    await redis.lpush("latest-posts", JSON.stringify(data));
    await redis.ltrim("latest-posts", 0, 63);
  }
}

main();
