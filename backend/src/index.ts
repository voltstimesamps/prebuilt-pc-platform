import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import systemsRouter from "./routes/systems.js"
import manufacturerRouter from "./routes/manufacturers.js";
import cpuRouter from "./routes/cpus.js"
import gpuRouter from "./routes/gpus.js"

const app = new Hono()
app.use("/*", cors())

app.route("/systems", systemsRouter)
app.route("/manufacturers", manufacturerRouter)
app.route("/cpus", cpuRouter)
app.route("/gpus", gpuRouter)



serve({ fetch: app.fetch, port: 3001 })