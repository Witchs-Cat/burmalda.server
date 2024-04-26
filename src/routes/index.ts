import { Router, static as _static } from "express";
import { apiRouter } from "./api"

export const appRouter = Router();
const staticRouter = _static("public")

appRouter.use("/api", apiRouter)
appRouter.use(staticRouter)