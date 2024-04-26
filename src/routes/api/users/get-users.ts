import { Response, Request } from "express";
import { UsersRepository } from "../../../repositories";

export async function getUsers(request:Request, response: Response){
    const repository = request.app.get(UsersRepository.name) as UsersRepository
    const users = await repository.getUsersAsync();
    console.log(users)

    response.json(users ?? [])
}