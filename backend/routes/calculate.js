import { Router } from "express";
import { parseDataUrl } from "../utils/parseDataUrl.js";
import { buildPrompt, getGeminiModel } from "../lib/gemini.js";

const router = Router();

// POST /api/calculate
// body: { image: <dataURL>, variables?: { [k: string]: string } }
router.post("/", async (req, res) => {
    try {
        const { image, variables = {} } = req.body || {};
        if (!image || typeof image !== "string") {
            return res.status(400).json({ ok: false, error: "'image' (data URL) is required" });
        }

        const { mimeType, base64 } = parseDataUrl(image);

        const model = getGeminiModel();
        const prompt = buildPrompt(variables);

        const aiResponse = await model.generateContent([
            { text: prompt },
            {
                inlineData: {
                    data: base64,
                    mimeType
                }
            }
        ]);

        const raw = aiResponse?.response?.text?.();
        if (!raw) {
            return res.status(502).json({ ok: false, error: "Empty response from model" });
        }

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch {
            // try to clean stray code fences if any
            const cleaned = raw
                .trim()
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/i, "")
                .replace(/```$/i, "");
            try {
                parsed = JSON.parse(cleaned);
            } catch {
                return res.status(502).json({ ok: false, error: "Model returned non-JSON", raw });
            }
        }

        return res.json({ ok: true, data: parsed });
    } catch (err) {
        console.error("calculate error:", err);
        return res.status(500).json({ ok: false, error: err.message || "Server error" });
    }
});

export default router;
