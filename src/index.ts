/**
 * Required External Modules
 */
import express, { Express } from "express";
import { noteRouter } from "./notes/notes.router";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found-middleware";

/**
 * App Variables
 */
const PORT = process.env.PORT || 3001

const app: Express = express();

/**
 * App Configuration
 */
app.use(express.json());
app.use("/notes", noteRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});