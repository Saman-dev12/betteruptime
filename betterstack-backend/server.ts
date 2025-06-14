import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import UserRouter from "./routes/users.ts"
import MonitorRouter from "./routes/monitor.ts"
import { clerkMiddleware } from '@clerk/express';

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware());


app.use("/api/user",UserRouter);
app.use("/api/monitor",MonitorRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
