import { Client } from "pg";

import { IRole, IUser } from "../models";

export class RolesRepositroy  {
    private readonly dbClient: Client

    constructor(dbClient: Client){
        this.dbClient = dbClient
    }

    public async getByIdAsync(id: Number): Promise<IRole | null>{
        const response = await this.dbClient.query(`
            SELECT * FROM roles
        `)

        if (response.rowCount == 0)
            return null 

        return response.rows[0] as IRole;
    }
}