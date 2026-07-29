import { Hono } from "hono";
import prisma from "../database.js"

const router = new Hono()

router.get("/", async (c) => {
    const cpus = await prisma.cpu.findMany({
        include: {
            manufacturer: true
        }
    })
    return c.json(cpus)
})

router.get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const cpu = await prisma.cpu.findUnique({
        where: { id },
        include: { manufacturer: true }
    })
    if (!cpu) {
        return c.json({ error: "cpu not found" }, 404)
    }
    return c.json(cpu)
})

router.post("/", async (c) => {
    const body = await c.req.json()
    const cpu = await prisma.cpu.create({ data: body })
    return c.json(cpu)
})

router.put("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const body = await c.req.json()
    const cpu = await prisma.cpu.update({ where: { id }, data: body })
    return c.json(cpu)
})

router.delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"))
    const deleted = await prisma.cpu.delete({ where: { id } })
    return c.json(deleted)
})

export default router