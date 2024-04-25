import { Response, Request } from "express";
import { UsersRepositry } from "../../../repositories";

export async function getUsers(request:Request, response: Response){
    const repository = request.app.get(UsersRepositry.name) as UsersRepositry
    const users = await repository.getUsersAsync();
    console.log(users)

    response.json(users?? [])
}