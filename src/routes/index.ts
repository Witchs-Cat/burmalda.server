import { Router } from "express";

export const router: Router = Router();


router.get("/", (request, response) => {
    response.send("Express + TypeScript Server");
})
