import express, { Request, Response } from "express";
import fs from "fs-extra";
import { TodoType } from "../types/types";

export const selected = (req: Request, res: Response) => {
  const { id } = req.params;
  const todosJson = fs.readFileSync("./toDo.json", "utf8");

  const selectedTodos: TodoType[] = JSON.parse(todosJson);

  const todo = selectedTodos.find((todo: any) => {
    return todo.id === Number(id);
  });

  todo
    ? res.json({
        success: true,
        message: "UURUU UURIIGUU HUURJ BOLOHGUI SHUU YG ODOO HII CHI CHADNAA😮‍💨🔥",
        todo,
      })
    : res.status(404).json({ success: false, message: "Олдсонгүй🧐" });
};
