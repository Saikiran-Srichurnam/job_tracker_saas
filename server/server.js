import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Optional: Graceful shutdown to close the database connection
process.on("SIGINT", async () => {
  // If you exported prisma from your db.js, you can close it here
  // await prisma.$disconnect();
  process.exit(0);
});
