import express,{Request, Response} from "express";
import fs from "fs-extra";
import { TodoType } from "../types/types";
import { createToDo } from "../controller/createToDo";
import { getAll } from "../controller/getAllToDo";
import { selected } from "../controller/selected";
import { deletedById } from "../controller/deletedByid";
import { updatedTodo } from "../controller/updateToDo";

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
todoRouter.put("/:id", updatedTodo)

export default todoRouter;