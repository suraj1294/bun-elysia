import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
// http.ts
const vmRegion = process.env.FLY_REGION || "local";
console.log(`Doing it from ${vmRegion}`);

const app = new Elysia()
  .use(swagger())
  .get("/", (c) => "ok")
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidort",
    })
  )
  .use(cookie())
  .get("/sign/:name", async ({ jwt, cookie, setCookie, params }) => {
    setCookie("auth", await jwt.sign(params), {
      httpOnly: true,
      maxAge: 7 * 86400,
    });

    return `Sign in as ${cookie.auth}`;
  })
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return `Hello ${profile.name}`;
  })
  .get("/logout", ({ removeCookie }) => {
    removeCookie("auth");
    return `ok`;
  })
  .listen({
    hostname: "::",
    port: process.env.PORT ?? 3000,
  });

export type App = typeof app;
