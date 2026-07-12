import { Hono } from "hono";
import prisma from "../database.js"
import { get } from "node:http";
import { stringBufferToString } from "hono/utils/html";

var id

const router = new Hono()

router.get("/", (c) => {
    return c.text("Systems route working")
})

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
