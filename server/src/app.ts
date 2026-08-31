import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import cors from "cors";

// ====
import { limiter } from "./secure/limitter";
import corsOptions from "./secure/cors";
import { connectToDB } from "./db/db";
import likesRouter from "./routes/likes.route";

// ======

const server = express();

server.set("trust proxy", 1);

server.use(express.static(path.join(__dirname, "./public")));
server.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./public/conflict.html"));
});

server.use(cors(corsOptions));

server.use(helmet());

server.use(limiter);
const port = 3000;

server.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use(morgan("dev"));

server.use("/api/likes", likesRouter);
//
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
const start = async () => {
  try {
    await connectToDB();

    server.listen(port, () => {
      console.log("All configs works!");
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

start();
