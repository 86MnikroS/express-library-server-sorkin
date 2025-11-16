import express from "express";
import { bookRouter } from "./routers/bookRouter.ts";
import { initMongo } from "./server.ts";
import { errorHandler } from "./errorHandler/errorHandler.ts";

const PORT = 3050;
export const app = express();

// Middleware
app.use(express.json());

// Routers
app.use("/api/books", bookRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Error handler
app.use(errorHandler);

// Start app with Mongo connection
const start = async () => {
  await initMongo();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

start();