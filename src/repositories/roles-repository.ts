import { Client } from "pg";

import { IRepository } from "./repository";
import { IRole } from "../models";

export class RolesRepositroy implements IRepository {
    private readonly dbClient: Client

    constructor(dbClient: Client){
        this.dbClient = dbClient
    }

    async initAsync(): Promise<void> {
        await this.dbClient.query(`
            CREATE TABLE IF NOT EXISTS roles(
                id SERIAL PRIMARY KEY,
                label TEXT
            );`
        )
    }

    async getByIdAsync(id: Number): Promise<IRole | null>{
        const response = await this.dbClient.query(`
            SELECT * FROM ROLES
        `)
        if (response.rowCount == 0)
            return null 

        return response.rows[0] as IRole;
    }
}