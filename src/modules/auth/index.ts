import { BaseAppType } from "../..";
import { ApiResponse } from "@/types/index";
import { verifyAuth } from "@/middlewares/auth";
import { t } from "elysia";

export const auth = (app: BaseAppType) =>
  app.group("/auth", (app) =>
    app

      .post(
        "/sign",
        async ({ body, jwt, setCookie }): Promise<ApiResponse> => {
          //check if valid user (user exists)
          // check if password is correct
          //generate token

          const authToken = await jwt.sign({ username: body.username });

          setCookie("auth", authToken, {
            httpOnly: true,
            maxAge: 7 * 86400,
          });

          return { success: true, data: { token: authToken } };
        },
        {
          body: t.Object({
            username: t.String(),
            password: t.String(),
          }),
        }
      )

      .use(verifyAuth)
      .get("/profile", async ({ profile }): Promise<ApiResponse> => {
        console.log(profile);

        return {
          success: true,
          data: profile,
        };
      })
  );
