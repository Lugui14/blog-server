import "dot-env";
import "reflect-metadata";
import cors from "cors";
import http from "http";
import "express-async-errors";
import { Server } from "socket.io";
import express, { NextFunction, Request, Response } from "express";

import router from "./routes";

import { AppError } from "../../errors/AppError";

const app = express();

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => console.log(`Usuário conectado.`));

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      message: err.message,
    });

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

serverHttp.listen(3333, () => console.log("Server is Running"));

export { io };
