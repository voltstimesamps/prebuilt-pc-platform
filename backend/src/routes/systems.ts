import { Hono } from "hono";
import prisma from "../database.js"
import { rankSystems } from "../engine.js"
import { CategoryAverages } from "../engine.js"

const router = new Hono()

const systemIncludes = {
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
    const systems = await prisma.system.findMany({ where, include: systemIncludes })
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
        include: systemIncludes
    })

    const rankedList = rankSystems(systemsList, requirementsProfile, categoryAverages)

    return c.json(rankedList)
})

router.get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const system = await prisma.system.findUnique({
        where: { id },
        include: systemIncludes
    })
    if (!system) {
        return c.json({ error: "System not found" }, 404)
    }
    return c.json(system)
})

router.post("/", async (c) => {
    const body = await c.req.json()
    const { manufacturerId, cpuId, gpuId, ramConfigId, storageConfigId, ...rest } = body
    const system = await prisma.system.create({
        data: {
            manufacturer: { connect: { id: manufacturerId } },
            systemCpus: {
                create: [{ cpu: { connect: { id: cpuId } } }]
            },
            systemGpus: {
                create: [{ gpu: { connect: { id: gpuId } } }]
            },
            systemRam: {
                create: [{ ramConfig: { connect: { id: ramConfigId } } }]
            },
            systemStorage: {
                create: [{ storageConfig: { connect: { id: storageConfigId } } }]
            },

            ...rest
        }
    }
    )
    return c.json(system)
})

router.put("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const body = await c.req.json()
    const { manufacturerId, ...rest } = body
    const system = await prisma.system.update({
        where: { id },
        data: {
            ...rest,
            manufacturer: { connect: { id: manufacturerId } }
        }
    }
    )
    return c.json(system)
})

router.delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const deleted = await prisma.system.delete({ where: { id } })
    return c.json(deleted)
})

export default router