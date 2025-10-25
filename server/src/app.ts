import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.handler";
import cookieParser from "cookie-parser";
import path from "path";

const app: Express = express();
const __dirname = path.resolve();

// 1️⃣ Logging
app.use(morgan("dev"));

// 2️⃣ Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// 3️⃣ CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// 4️⃣ Routes
app.use("/", (req, res) => {
  res.send("hello world");
});

// 5️⃣ Error Handler
app.use(errorHandler);

// 6️⃣ Deploy (static files)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));

  app.use((req, res) => {
    const indexPath = path.resolve(__dirname, "../client/dist/index.html");
    res.sendFile(indexPath);
  });
}

export default app;
