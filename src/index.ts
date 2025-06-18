import express, { Request, Response } from "express";
import { TodoType } from "./types/types";
import fs from "fs-extra";
import todoRouter from "./router/todos.router";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/todos", todoRouter)

app.get("/", (req: Request, res: Response) => {
  res.send({ heloe: "toDo" });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
