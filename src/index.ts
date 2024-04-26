import express, { Express } from "express"
import { Client } from "pg"

import { appRouter } from "./routes"
import { UsersRepository, dropAsync, initAsync } from "./repositories"
import { RolesRepositroy } from "./repositories"

const app: Express = express()
const port: Number = 8080

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

app.use(appRouter)

const server = app.listen(port, async () => {
    await dbClient.connect()
    await dropAsync(dbClient)
    await initAsync(dbClient)

    console.log(`Server is running at http://127.0.0.1:${port}`)
})