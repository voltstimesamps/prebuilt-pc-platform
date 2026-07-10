import { Hono } from "hono";
import { serve } from "@hono/node-server";
import systemsRouter from "./routes/systems.js"

const app = new Hono()

app.route("/systems", systemsRouter)

serve({ fetch: app.fetch, port: 3000 })