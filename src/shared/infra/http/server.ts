import "dot-env";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { AppError } from "../../errors/AppError";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

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

app.listen(3000, () => console.log("Server is Running"));