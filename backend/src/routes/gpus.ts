import { Hono } from "hono";
import prisma from "../database.js"

const router = new Hono()

router.get("/", async (c) => {
    const gpus = await prisma.gpu.findMany({
        include: {
            manufacturer: true
        }
    })
    return c.json(gpus)
})

router.get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const gpu = await prisma.gpu.findUnique({
        where: { id },
        include: { manufacturer: true }
    })
    if (!gpu) {
        return c.json({ error: "gpu not found" }, 404)
    }
    return c.json(gpu)
})

router.post("/", async (c) => {
    const body = await c.req.json()
    const gpu = await prisma.gpu.create({ data: body })
    return c.json(gpu)
})

router.put("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const body = await c.req.json()
    const gpu = await prisma.gpu.update({ where: { id }, data: body })
    return c.json(gpu)
})

router.delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const deleted = await prisma.gpu.delete({ where: { id } })
    return c.json(deleted)
})

export default router