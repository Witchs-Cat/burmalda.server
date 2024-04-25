import express, { Express } from "express"
import { Client } from "pg"

import { appRouter } from "./routes"
import { UsersRepositry as UsersRepository } from "./repositories"
import { RolesRepositroy } from "./repositories/roles-repository"

const app: Express = express()
const port: Number = 8443

const dbClient = new Client({
    host: "localhost",
    port: 5432,
    database: "Burmalda",
    user: "burmaldei",
    password: "123"
})

const roles = new RolesRepositroy(dbClient)
const users = new UsersRepository(dbClient)
app.set(UsersRepository.name, users)
app.set(RolesRepositroy.name, roles)

app.use("/", appRouter)

app.listen(port, async () => {
    await dbClient.connect()

    await roles.initAsync()
    await users.initAsync()

    console.log(`Server is running at http://127.0.0.1:${port}`)
})
