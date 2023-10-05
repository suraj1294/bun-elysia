import { BaseAppType } from "..";

export const verifyAuth = (app: BaseAppType) =>
  app
    .derive(async ({ cookie: { auth }, set, jwt }) => {
      const profile = await jwt.verify(auth);

      if (!profile) {
        set.status = 401;
      } else return { profile };
    })
    .onBeforeHandle(({ set }) => {
      if (set.status === 401) {
        return {
          message: "Unauthorized",
          success: false,
        };
      }
    });
