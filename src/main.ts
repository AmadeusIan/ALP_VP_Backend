<<<<<<< HEAD
import express from "express"
import { PORT } from "./utils/env-util"
import { publicRouter } from "./routes/public-api"
import { errorMiddleware } from "./middleware/error-middleware"
import { privateRouter } from "./routes/private-api"

const app = express()


app.use(express.json())
app.use("/api", publicRouter)
app.use("/api", privateRouter)
app.use(errorMiddleware)

app.listen(PORT || 3000, () => {
    console.log(`Connected to port ${PORT}`)
=======
import express from 'express'
import { PORT } from './utils/env-util'
import { publicRouter } from './routes/public-api'
import { errorMiddleware } from './middlewares/error-middleware'
import { privateRouter } from './routes/private-api'

const app = express()

app.use(express.json())
app.use("/api/public", publicRouter)
app.use("/api/private", privateRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Connnected to port ${PORT}`)
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
})