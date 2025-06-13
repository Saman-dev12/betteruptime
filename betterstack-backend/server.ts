import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { clerkClient, requireAuth } from '@clerk/express'
import { PrismaClient } from "./generated/prisma"
import UserRouter from "./routes/users.ts"

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api/user",UserRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
