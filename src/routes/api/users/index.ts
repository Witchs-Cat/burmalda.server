import { Router } from "express";

import { getUsers } from "./get-users";

export const usersRouter = Router()

usersRouter.get('/', getUsers)