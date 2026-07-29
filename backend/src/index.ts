import { Hono } from "hono";
import { serve } from "@hono/node-server";
import systemsRouter from "./routes/systems.js"
import manufacturerRouter from "./routes/manufacturers.js";

const app = new Hono()

app.route("/systems", systemsRouter)
app.route("/manufacturers", manufacturerRouter)

serve({ fetch: app.fetch, port: 3000 })