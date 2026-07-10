import { Hono } from "hono";

const router = new Hono()

router.get("/", (c) => {
    return c.text("Systems route working")
})

export default router