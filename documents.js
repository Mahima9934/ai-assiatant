import express from "express";
import multer from "multer";
import fs from "fs";
import { initPinecone } from "../utils/pineconeClient.js";
import { getEmbedding } from "../utils/embeddings.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("document"), async (req, res) => {
  const index = initPinecone(); // ✅ get Pinecone index
  const text = fs.readFileSync(req.file.path, "utf8");

  const chunkSize = 500;
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  for (let i = 0; i < chunks.length; i++) {
    const embed = await getEmbedding(chunks[i]);
    await index.upsert([
      {
        id: `${req.file.filename}-${i}`,
        values: embed,
        metadata: { text: chunks[i] },
      },
    ]);
  }

  fs.unlinkSync(req.file.path);
  res.json({ message: "Document indexed successfully!" });
});

export default router;
