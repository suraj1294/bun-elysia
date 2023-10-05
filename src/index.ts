import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { auth } from "./modules/auth";
import { ApiResponse } from "./types";
// http.ts
const vmRegion = process.env.FLY_REGION || "local";
console.log(`Doing it from ${vmRegion}`);

export type BaseAppType = typeof baseApp;

export const baseApp = new Elysia()
  .get("/", () => ({ ok: true }))
  .use(swagger())
  .use(cookie())
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET as string,
    })
  );

const app = new Elysia()
  .use(baseApp)
  .use(auth)
  .get(
    "/logout",
    async ({ removeCookie, cookie: { auth } }): Promise<ApiResponse> => {
      removeCookie("auth");
      return { success: true, data: "user logged out" };
    }
  )
  .listen(
    {
      hostname: "::",
      port: process.env.PORT ?? 3000,
    },
    ({ hostname, port }) => {
      console.log(`application running on ${hostname}:${port}`);
    }
  );

export type App = typeof app;
