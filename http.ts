import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cookie from "@elysiajs/cookie";
// http.ts
const vmRegion = process.env.FLY_REGION || "local";
console.log(`Doing it from ${vmRegion}`);

const app = new Elysia()
  .use(swagger())
  .get("/", (c) => "ok")

  .use(cookie())
  // @ts-ignore
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return `Hello ${profile.name}`;
  })
  .listen({
    hostname: "::",
    port: process.env.PORT ?? 3000,
  });

export type App = typeof app;
