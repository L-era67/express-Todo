import express, { Request, Response } from "express";
import fs from "fs-extra";

import { TodoType } from "../types/types";

let todos: TodoType[] = [];

export const createToDo = (req: Request, res: Response) => {
  const { desc }: { desc: string } = req.body;

  const uniqueId = Math.random();

  console.log("DESCRIPTION", desc);

  // let toDos:TodoType[] = []

  if (fs.existsSync("./toDo.json")) {
    const existingTodo = fs.readFileSync("./toDo.json", "utf8");

    if (existingTodo.trim().length > 0) {
      todos = JSON.parse(existingTodo);
    }
  }
  const todo = {
    id: uniqueId,
    desc,
    isCompleted: false,
  };

  todos.push(todo);
  console.log("todos", todos);

  try {
    res.json({ success: true, todos });
    fs.writeFileSync("./toDo.json", JSON.stringify(todos, null, 2));
  } catch (error) {
    res.send("Жагсаалтал нэмэгдсэнгүй дахин оролдоно уу!")
  }
};
