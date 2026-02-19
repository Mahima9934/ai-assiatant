import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";

// ✅ Export a function that returns Pinecone index
export function initPinecone() {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY, // from .env
  });

  // Create and return index instance
  return client.index(process.env.INDEX_NAME);
}
