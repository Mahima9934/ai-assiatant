import express from "express";
import axios from "axios";
import { initPinecone } from "../utils/pineconeClient.js";
import { getEmbedding } from "../utils/embeddings.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const index = initPinecone();
  const query = req.body.query;

  const queryEmbedding = await getEmbedding(query);

  const result = await index.query({
    queryRequest: {
      topK: 5,
      includeMetadata: true,
      vector: queryEmbedding,
    },
  });

  const context = result.matches.map((m) => m.metadata.text).join("\n");
  const prompt = `Answer using this context:\n${context}\n\nQ: ${query}`;

  const response = await axios.post(
    "https://api.gemini.com/v1/chat/completions",
    {
      model: "gemini-001",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` },
    },
  );

  res.json({ answer: response.data.choices[0].message.content });
});

export default router;
