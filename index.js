import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documents.js";
import queryRoutes from "./routes/query.js";
import { initPinecone } from "./utils/pineconeClient.js"; 
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Pinecone index
const index = initPinecone();
app.locals.index = index;

// Routes
app.use("/documents", documentRoutes);
app.use("/query", queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
