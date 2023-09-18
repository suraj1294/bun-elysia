// http.ts
const vmRegion = process.env.FLY_REGION || "local";
console.log(`Doing it from ${vmRegion}`);

const port = 3000;

// Bun.serve({
//   port: 3000,
//   fetch(request) {
//     const region = request.headers.get("fly-region") || "??"
//     const url = new URL(request.url)
//     console.log(request.headers.get("fly-client-ip"), request.url)

//     return new Response(`
//       Welcome to Bun!\n\n
//       This is ${url.pathname}\n
//       Served from ${region}
//     `);
//   },
// })

import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger())
  .get("/", () => ({ ok: "true" }))
  .post(
    "/sign-in",
    async (context) => {
      const { set, body } = context;

      if (await signIn(body)) {
        set.status = 200;
        return { ok: "true" };
      } else {
        set.status = 403;
        return { ok: "false", error: "invalid username or password" };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .listen({
    hostname: "::",
    port: process.env.PORT ?? port,
  });

export type App = typeof app;

function signIn(body: { username: string; password: string }): Promise<any> {
  return new Promise((resolve) => {
    if (body.username === "suraj" && body.password === "suraj1294") resolve(1);
    else resolve(0);
  });
}
