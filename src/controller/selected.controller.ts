import express, { Request, Response } from "express";
import fs from "fs-extra";
import { TodoType } from "../types/types";
import { readTodos } from "../lib/todosJSON";

export const selected = async(req: Request, res: Response) => {
  const { id } = req.params;
  // const todosJson =await fs.promises.readFile("./toDo.json", "utf8");

  // const selectedTodos: TodoType[] = JSON.parse(todosJson);

  const selectedTodos = await readTodos();

  const todo = selectedTodos.find((todo: any) => {
    return todo.id === Number(id);
  });

  todo
    ? res.json({
        success: true,
        message: "YG ODOO HII CHI CHADNAA😮‍💨🔥",
        todo,
      })
    : res.status(404).json({ success: false, message: "Олдсонгүй🧐" });
};
