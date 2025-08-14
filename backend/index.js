import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import calculateRouter from "./routes/calculate.js";

dotenv.config();

const app = express();
const port = 8080;


app.use(cors({
    origin: (process.env.ALLOWED_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean) || "*"
}));

// Accept large canvas payloads
app.use(express.json({ limit: "10mb" }));

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/calculate", calculateRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
