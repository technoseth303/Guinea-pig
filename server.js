// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const endpoint = "https://models.github.ai/inference";
const model = "mistral-ai/mistral-medium-2505";

// IMPORTANT: store your token in an environment variable
const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.error("ERROR: Missing GITHUB_TOKEN environment variable");
    process.exit(1);
}

app.post("/api/mistral", async (req, res) => {
    try {
        const userPrompt = req.body.prompt;

        const response = await fetch(`${endpoint}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: "You are a chaotic rat-pig assistant." },
                    { role: "user", content: userPrompt }
                ],
                temperature: 1.0,
                top_p: 1.0,
                max_tokens: 500
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (err) {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Proxy failed" });
    }
});

app.listen(3000, () => {
    console.log("Mistral proxy running on http://localhost:3000");
});
