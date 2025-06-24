import express, { Request, Response } from "express";

import { createToDo } from "../controller/createToDo.controller";
import { getAll } from "../controller/getAllToDo.controller";
import { selected } from "../controller/selected.controller";
import { deletedById } from "../controller/deletedByid.controller";
import { updatedTodo } from "../controller/updateToDo.controller";

const todoRouter = express.Router();

// ADD TO-DO=> desc:
todoRouter.post("/", createToDo);

// BUH TO DO LIST AWAH
todoRouter.get("/", getAll);

// NEGIIG AWAH
todoRouter.get("/:id", selected);

//TO-DO DELETE
todoRouter.delete("/:id", deletedById);

//TO-DO UPDATE
todoRouter.put("/:id", updatedTodo);

export default todoRouter;
