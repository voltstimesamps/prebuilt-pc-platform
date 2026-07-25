import { Hono } from "hono";
import prisma from "../database.js"
import { get } from "node:http";
import { stringBufferToString } from "hono/utils/html";
import { rankSystems } from "../engine.js"
import { CategoryAverages } from "../engine.js"
import { parse } from "node:url";
import { createRequire } from "node:module";

var id

const router = new Hono()

export default router

prisma.system.findUnique({
    where: { id },
    include: {
        systemCpus: {
            include: {
                cpu: true
            }
        },
        systemGpus: {
            include: {
                gpu: true
            }
        },
        systemRam: {
            include: {
                ramConfig: true
            }
        },
        systemStorage: {
            include: {
                storageConfig: true
            }
        }
    }
})

prisma.system.findMany({
    where: { active: true },
    include: {
        systemCpus: {
            include: {
                cpu: true
            }
        },
        systemGpus: {
            include: {
                gpu: true
            }
        },
        systemRam: {
            include: {
                ramConfig: true
            }
        },
        systemStorage: {
            include: {
                storageConfig: true
            }
        }
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

router.post("/recommend", async (c) => {
    const rawAverarages = await prisma.system.groupBy({
        by: ['category'],
        _avg: {
            weightKg: true,
            lengthMm: true,
            widthMm: true,
        }
    })
    const categoryAverages = rawAverarages.reduce((acc, row) => {
        acc[row.category as string] = {
            avgWeightKg: row._avg.weightKg ?? 0,
            avgLengthMm: row._avg.lengthMm ?? 0,
            avgWidthMm: row._avg.widthMm ?? 0,
        }
        return acc
    }, {} as CategoryAverages)
    const requirementsProfile = await c.req.json()
    const systemsList = await prisma.system.findMany({
        where: { active: true },
        include: {
            systemCpus: {
                include: {
                    cpu: true
                }
            },
            systemGpus: {
                include: {
                    gpu: true
                }
            },
            systemRam: {
                include: {
                    ramConfig: true
                }
            },
            systemStorage: {
                include: {
                    storageConfig: true
                }
            }
        }
    })

    const rankedList = rankSystems(systemsList, requirementsProfile, categoryAverages)

    return c.json(rankedList)
})