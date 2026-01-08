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
})