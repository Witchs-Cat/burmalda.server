import { Client } from "pg";

import { IUser } from "../models/user";
import { IRepository } from "./repository"

export class UsersRepositry implements IRepository{
    private readonly dbClient: Client

    constructor(dbClient: Client){
        this.dbClient = dbClient 
    }

    public async initAsync(): Promise<void>{
        await this.dbClient.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                login TEXT,
                fio TEXT, 
                role_id INT REFERENCES roles(id) 
            );`
        );
    }


    public async getUsersAsync() : Promise<IUser[] | null> {
        const response = await this.dbClient.query("SELECT * FROM users");
        
        return response.rows as Array<IUser>
    }
}