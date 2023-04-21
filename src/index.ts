import express, { Request, Response } from 'express'
import { router } from './routes/routes'
import { connects } from './config/config'
const app = express()
const PORT = 8080

app.use(express.json())
app.use("", router)

connects()

app.listen(PORT, (): void => {
    console.log("Listening on the server")
})