import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import graphRoutes from "./routes/graphRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/graph", graphRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AutoGraph API running on port ${PORT}`);
});