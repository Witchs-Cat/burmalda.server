import { Router } from "express";
import { apiRouter } from "./api"
import { staticRouter } from "./static";

export const appRouter = Router();

appRouter.use("/api", apiRouter)
appRouter.use(staticRouter)