import { Client } from "pg";

import { IUser } from "../models/user";

export class UsersRepository{
    private readonly dbClient: Client

    constructor(dbClient: Client){
        this.dbClient = dbClient 
    }

    public async initAsync(): Promise<void>{
        const result = await this.dbClient.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                login TEXT,
                pass TEXT,
                fio TEXT,
                id_role INT REFERENCES roles (id),
                is_blocked INT default 0
            );`
        )

        console.log(result)
    }

    public async getUsersAsync() : Promise<IUser[] | null> {
        const response = await this.dbClient.query("SELECT * FROM users");
        return response.rows as Array<IUser>
    }
}