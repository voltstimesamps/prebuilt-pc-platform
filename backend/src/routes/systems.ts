import { Hono } from "hono";
import prisma from "../database.js"
import { get } from "node:http";
import { stringBufferToString } from "hono/utils/html";

var id

const router = new Hono()

export default router

prisma.system.findUnique({
    where: { id: id },
    include: {
        systemCpus: true,
        systemGpus: true,
        systemRam: true,
        systemStorage: true
    }
})

prisma.system.findMany({
    where: { id: id },
    include: {
        systemCpus: true,
        systemGpus: true,
        systemRam: true,
        systemStorage: true
    }
})

router.get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const system = await prisma.system.findUnique({
        where: { id },
        include: {
            systemCpus: true, systemGpus: true, systemRam: true, systemStorage: true
        }
    })
    if (!system) {
        return c.json({ error: "System not found" }, 404)
    }
    return c.json(system)
})

router.get("/", async (c) => {
    const where: any = {}
    const category = c.req.query("category")
    const maxPriceUsd = c.req.query("maxPriceUsd")
    const maxWeightKg = c.req.query("maxWeightKg")
    const os = c.req.query("os")
    const active = c.req.query("active")
    if (category) {
        where.category = category
    }
    if (maxPriceUsd) {
        where.priceUsd = { lte: parseFloat(maxPriceUsd) }
    }
    if (maxWeightKg) {
        where.weightKg = { lte: parseFloat(maxWeightKg) }
    }
    if (os) {
        where.os = os
    }
    if (active !== undefined) {
        where.active = (active === "true")
    }
    const systems = await prisma.system.findMany({ where })
    return c.json(systems)
})