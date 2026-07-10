import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client.js";

const url = process.env.DATABASE_URL
if (!url) {
    throw new Error("DATABASE_URL is not set")
}

const pool = new Pool({ connectionString: url })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma