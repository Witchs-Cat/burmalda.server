import express, { Express, Request, Response } from "express"
import { router } from "./routes"

const app: Express = express()
const port: Number = 8080

// app.get("/", (req: Request, res: Response) => {
//     res.send("Express + TypeScript Server");
// })

app.use('/', router)

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
